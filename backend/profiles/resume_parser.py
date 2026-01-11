import re
import PyPDF2
import docx
from io import BytesIO
from .gemini_analyzer import extract_name_from_resume, extract_all_resume_data


def extract_text_from_pdf(file):
    """Extract text from PDF file"""
    try:
        pdf_reader = PyPDF2.PdfReader(file)
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text()
        return text
    except Exception as e:
        print(f"Error extracting PDF text: {e}")
        return ""


def extract_text_from_docx(file):
    """Extract text from DOCX file"""
    try:
        doc = docx.Document(file)
        text = ""
        for paragraph in doc.paragraphs:
            text += paragraph.text + "\n"
        return text
    except Exception as e:
        print(f"Error extracting DOCX text: {e}")
        return ""


def extract_email(text):
    """Extract email from text"""
    email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    emails = re.findall(email_pattern, text)
    return emails[0] if emails else None


def extract_phone(text):
    """Extract phone number from text"""
    phone_patterns = [
        r'\+?1?\s*\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}',
        r'\+?\d{1,3}[-.\s]?\d{3,4}[-.\s]?\d{4}',
    ]
    for pattern in phone_patterns:
        phones = re.findall(pattern, text)
        if phones:
            return phones[0]
    return None


def extract_links(text):
    """Extract URLs from text"""
    url_pattern = r'https?://(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&/=]*)'
    urls = re.findall(url_pattern, text)
    
    linkedin = None
    github = None
    website = None
    
    for url in urls:
        if 'linkedin.com' in url.lower():
            linkedin = url
        elif 'github.com' in url.lower():
            github = url
        elif not website:
            website = url
    
    return linkedin, github, website


def extract_skills(text):
    """Extract skills from text - looking for common technical skills"""
    # Common technical skills
    common_skills = [
        'Python', 'Java', 'JavaScript', 'TypeScript', 'C++', 'C#', 'Ruby', 'PHP', 'Swift', 'Kotlin',
        'React', 'Angular', 'Vue', 'Node.js', 'Express', 'Django', 'Flask', 'Spring', 'Laravel',
        'HTML', 'CSS', 'SASS', 'Tailwind', 'Bootstrap',
        'SQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase',
        'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Jenkins', 'Git', 'GitHub', 'GitLab',
        'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Pandas', 'NumPy',
        'REST API', 'GraphQL', 'Microservices', 'Agile', 'Scrum'
    ]
    
    found_skills = []
    text_lower = text.lower()
    
    for skill in common_skills:
        if skill.lower() in text_lower:
            found_skills.append(skill)
    
    return found_skills


def extract_education(text):
    """Extract education information"""
    education = []
    
    # Look for degree keywords
    degree_patterns = [
        r"(?i)(Bachelor|Master|PhD|B\.S\.|M\.S\.|B\.A\.|M\.A\.|B\.Tech|M\.Tech|MBA).*?(?=\n|$)",
        r"(?i)(Bachelors?|Masters?|Doctorate).*?(?=\n|$)"
    ]
    
    for pattern in degree_patterns:
        matches = re.findall(pattern, text)
        for match in matches:
            if isinstance(match, tuple):
                match = ' '.join(match)
            education.append({'degree': match.strip()})
    
    return education


def extract_experience(text):
    """Extract work experience"""
    experience = []
    
    # Look for job titles and company names
    # This is a simplified version - you may want to use NLP for better results
    lines = text.split('\n')
    
    for i, line in enumerate(lines):
        line = line.strip()
        # Look for lines that might be job titles (often capitalized or have specific keywords)
        if any(keyword in line.lower() for keyword in ['engineer', 'developer', 'manager', 'analyst', 'designer', 'intern']):
            experience.append({
                'title': line,
                'description': lines[i+1] if i+1 < len(lines) else ''
            })
    
    return experience[:5]  # Limit to first 5


def parse_resume(file, file_name):
    """
    Main function to parse resume and extract all information using AI
    """
    # Extract text based on file type
    if file_name.lower().endswith('.pdf'):
        raw_text = extract_text_from_pdf(file)
    elif file_name.lower().endswith(('.docx', '.doc')):
        raw_text = extract_text_from_docx(file)
    else:
        raw_text = ""
    
    if not raw_text:
        return {
            'full_name': None,
            'email': None,
            'phone': None,
            'raw_text': '',
            'file_name': file_name
        }
    
    # Extract email first (needed for AI extraction)
    email = extract_email(raw_text)
    
    # Try AI-powered extraction first (extracts everything in one go)
    ai_data = extract_all_resume_data(raw_text, email)
    
    if ai_data:
        # AI extraction successful - use all AI data
        print("✅ Using AI-extracted data for all fields")
        return {
            'full_name': ai_data.get('full_name'),
            'email': ai_data.get('email') or email,
            'phone': ai_data.get('phone'),
            'location': ai_data.get('location'),
            'linkedin': ai_data.get('linkedin'),
            'github': ai_data.get('github'),
            'website': ai_data.get('website'),
            'summary': ai_data.get('summary'),
            'years_of_experience': ai_data.get('years_of_experience', 0),
            'skills': ai_data.get('skills', []),
            'education': ai_data.get('education', []),
            'experience': ai_data.get('experience', []),
            'projects': ai_data.get('projects', []),
            'certifications': ai_data.get('certifications', []),
            'languages': ai_data.get('languages', []),
            'key_strengths': ai_data.get('key_strengths', []),
            'raw_text': raw_text,
            'file_name': file_name
        }
    
    # Fallback: AI extraction failed, use regex-based extraction
    print("⚠️ AI extraction failed, using regex fallback")
    phone = extract_phone(raw_text)
    linkedin, github, website = extract_links(raw_text)
    skills = extract_skills(raw_text)
    education = extract_education(raw_text)
    experience = extract_experience(raw_text)
    
    # Extract name with priority: email-based > AI > pattern matching
    name = None
    if email:
        email_name = email.split('@')[0]
        email_name = re.sub(r'^\d{4}\.', '', email_name)
        name_parts = re.split(r'[._-]', email_name)
        name_parts = [part for part in name_parts if part.isalpha() and len(part) > 1]
        if name_parts:
            name = ' '.join(part.capitalize() for part in name_parts)
    
    if not name:
        lines = [line.strip() for line in raw_text.split('\n') if line.strip()]
        for line in lines[:15]:
            if any(keyword in line.lower() for keyword in ['resume', 'curriculum vitae', 'cv', 'profile', 'objective', 'summary', 'experience', 'education', 'skills', 'projects', 'contact', 'email', 'phone', '@', 'http', 'linkedin', 'github']):
                continue
            if re.search(r'[\d+\-\/\|]', line):
                continue
            words = line.split()
            if 2 <= len(words) <= 4:
                if all(word[0].isupper() and word.replace('-', '').replace("'", '').isalpha() for word in words):
                    name = line
                    break
    
    return {
        'full_name': name,
        'email': email,
        'phone': phone,
        'linkedin': linkedin,
        'github': github,
        'website': website,
        'skills': skills,
        'education': education,
        'experience': experience,
        'projects': [],
        'certifications': [],
        'languages': [],
        'location': None,
        'summary': None,
        'years_of_experience': 0,
        'key_strengths': [],
        'raw_text': raw_text,
        'file_name': file_name
    }
