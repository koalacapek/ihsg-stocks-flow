import csv
import os
from django.http import JsonResponse
from django.conf import settings
from .utils import load_txt_files_by_year


CSV_DIR = os.path.join(settings.BASE_DIR, 'api', 'data')

def load_csvs_by_year(request, year):
    data = load_txt_files_by_year(CSV_DIR, year)
    return JsonResponse(data, safe=False)

def get_total_net_flow(request, year, id):
    data = load_txt_files_by_year(CSV_DIR, year)
    code_upper = str(id).upper()

    matching_rows = [
        row for row in data if row.get("Code", "").upper() == code_upper
    ]

    print(matching_rows)


    if not matching_rows:
        return JsonResponse({"error": f"No record found with id {id} in year {year}"}, status=404)

    # If multiple rows with same id, return all
    return JsonResponse(matching_rows, safe=False)
