import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)


def generate_interview_questions(goal, target_level, domain, resume_data=None):
    """
    Generate interview questions based on user's selections and resume data.
    """
    if not GEMINI_API_KEY or GEMINI_API_KEY == 'your_gemini_api_key_here':
        print("Gemini API key not configured, returning default questions")
        return get_default_questions(goal, domain)
    
    try:
        model = genai.GenerativeModel('gemini-2.5-flash')
        
        # Determine number of questions based on goal
        num_questions = {
            'full': 8,      # 45-60 min interview
            'focused': 5,   # 20-30 min interview
            'quick': 3      # 15 min interview
        }.get(goal, 5)
        
        # Build resume context
        resume_context = ""
        if resume_data:
            resume_context = f"""
Candidate Profile:
- Name: {resume_data.get('full_name', 'N/A')}
- Experience: {resume_data.get('years_of_experience', 0)} years
- Skills: {', '.join(resume_data.get('skills', [])[:10])}
- Key Strengths: {', '.join(resume_data.get('key_strengths', []))}
- Recent Projects: {', '.join([p.get('name', '') for p in resume_data.get('projects', [])[:2]])}
"""
        
        prompt = f"""
You are an expert technical interviewer. Generate {num_questions} interview questions for this candidate.

Interview Configuration:
- Goal: {goal} ({'Full Technical Interview' if goal == 'full' else 'Focused Practice' if goal == 'focused' else 'Quick Mock'})
- Target Level: {target_level}
- Domain: {domain}

{resume_context}

Generate EXACTLY {num_questions} questions that:
1. Match the target level difficulty ({target_level})
2. Focus on {domain} domain
3. Consider the candidate's skills and experience
4. Progress from easier to harder questions
5. Include a mix of: conceptual questions, coding problems, and scenario-based questions

Return as JSON array:
[
  {{
    "question": "Question text",
    "type": "conceptual" or "coding" or "scenario",
    "difficulty": "easy" or "medium" or "hard",
    "topics": ["topic1", "topic2"],
    "expected_answer_points": ["key point 1", "key point 2", "key point 3"]
  }}
]

IMPORTANT: Return ONLY the JSON array, no markdown, no explanation.
"""

        response = model.generate_content(prompt)
        result_text = response.text.strip()
        
        # Clean up response
        if '```json' in result_text:
            result_text = result_text.split('```json')[1].split('```')[0].strip()
        elif '```' in result_text:
            result_text = result_text.split('```')[1].split('```')[0].strip()
        
        # Extract JSON array
        start_idx = result_text.find('[')
        end_idx = result_text.rfind(']') + 1
        if start_idx != -1 and end_idx > start_idx:
            result_text = result_text[start_idx:end_idx]
        
        questions = json.loads(result_text)
        
        print(f"✅ Generated {len(questions)} questions for {domain} at {target_level} level")
        
        return questions
        
    except Exception as e:
        print(f"❌ Error generating questions with AI: {e}")
        import traceback
        traceback.print_exc()
        return get_default_questions(goal, domain)


def get_default_questions(goal, domain):
    """Fallback questions if AI generation fails"""
    questions_map = {
        'dsa': [
            {
                "question": "Explain the difference between an array and a linked list. When would you use each?",
                "type": "conceptual",
                "difficulty": "easy",
                "topics": ["data structures", "arrays", "linked lists"],
                "expected_answer_points": ["Memory allocation", "Access time", "Use cases"]
            },
            {
                "question": "Implement a function to reverse a linked list.",
                "type": "coding",
                "difficulty": "medium",
                "topics": ["linked lists", "algorithms"],
                "expected_answer_points": ["Iterative approach", "Pointer manipulation", "Time complexity O(n)"]
            },
            {
                "question": "What is the time complexity of common sorting algorithms?",
                "type": "conceptual",
                "difficulty": "medium",
                "topics": ["algorithms", "complexity"],
                "expected_answer_points": ["QuickSort O(n log n)", "MergeSort O(n log n)", "BubbleSort O(n²)"]
            }
        ],
        'web': [
            {
                "question": "Explain the difference between GET and POST HTTP methods.",
                "type": "conceptual",
                "difficulty": "easy",
                "topics": ["HTTP", "web fundamentals"],
                "expected_answer_points": ["Data transmission", "Security", "Use cases"]
            },
            {
                "question": "How would you implement authentication in a web application?",
                "type": "scenario",
                "difficulty": "medium",
                "topics": ["authentication", "security"],
                "expected_answer_points": ["JWT tokens", "Session management", "Security best practices"]
            }
        ],
        'ml': [
            {
                "question": "Explain the difference between supervised and unsupervised learning.",
                "type": "conceptual",
                "difficulty": "easy",
                "topics": ["machine learning", "fundamentals"],
                "expected_answer_points": ["Labeled data", "Use cases", "Examples of algorithms"]
            },
            {
                "question": "How do you handle overfitting in a machine learning model?",
                "type": "scenario",
                "difficulty": "medium",
                "topics": ["model training", "overfitting"],
                "expected_answer_points": ["Regularization", "Cross-validation", "More training data"]
            }
        ],
        'core': [
            {
                "question": "Explain how operating system manages memory.",
                "type": "conceptual",
                "difficulty": "medium",
                "topics": ["operating systems", "memory management"],
                "expected_answer_points": ["Virtual memory", "Paging", "Memory allocation"]
            }
        ]
    }
    
    domain_questions = questions_map.get(domain, questions_map['dsa'])
    num_questions = {'full': 8, 'focused': 5, 'quick': 3}.get(goal, 5)
    
    # Repeat questions if needed to reach required count
    while len(domain_questions) < num_questions:
        domain_questions.extend(domain_questions[:num_questions - len(domain_questions)])
    
    return domain_questions[:num_questions]
