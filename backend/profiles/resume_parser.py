import re
import PyPDF2
import docx
from io import BytesIO


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
    Main function to parse resume and extract all information
    """
    # Extract text based on file type
    if file_name.lower().endswith('.pdf'):
        raw_text = extract_text_from_pdf(file)
    elif file_name.lower().endswith(('.docx', '.doc')):
        raw_text = extract_text_from_docx(file)
    else:
        raw_text = ""
    
    # Extract information
    email = extract_email(raw_text)
    phone = extract_phone(raw_text)
    linkedin, github, website = extract_links(raw_text)
    skills = extract_skills(raw_text)
    education = extract_education(raw_text)
    experience = extract_experience(raw_text)
    
    # Extract name (usually first line or first few words)
    lines = [line.strip() for line in raw_text.split('\n') if line.strip()]
    name = lines[0] if lines else None
    
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
        'raw_text': raw_text,
        'file_name': file_name
    }
