from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Student


@csrf_exempt
def api_student_list(request):
    if not request.user.is_authenticated:
        return JsonResponse(
            {"error": "Authentication required."},
            status=401
        )

    if request.method != "GET":
        return JsonResponse(
            {"error": "Method not allowed."},
            status=405
        )

    students = Student.objects.all()

    data = [
        {
            "id": student.id,
            "student_name": student.student_name,
            "program": student.program,
            "year_level": student.year_level,
            "email": student.email,
        }
        for student in students
    ]

    return JsonResponse(
        {"count": len(data), "students": data}
    )