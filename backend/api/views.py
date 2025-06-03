import csv
import os
from django.http import JsonResponse
from django.conf import settings
from .utils import load_txt_files_by_year


CSV_DIR = os.path.join(settings.BASE_DIR, 'api', 'data')

def load_csvs_by_year(request, year):
    data = load_txt_files_by_year(CSV_DIR, year)
    return JsonResponse(data, safe=False)

def get_stocks_code(request):
    data = []
    filename = os.listdir(CSV_DIR)[0]
    filepath = os.path.join(CSV_DIR, filename)
    with open(filepath, newline='', encoding='utf-8') as f:
        reader = csv.DictReader(f, delimiter='|')
        for row in reader:
            data.append(row["Code"])
    
    return JsonResponse(data, safe=False)

def get_total_net_flow(request, year, id):
    data = load_txt_files_by_year(CSV_DIR, year)
    code_upper = str(id).upper()

    matching_rows = [
        row for row in data if row.get("Code", "").upper() == code_upper
    ]


    if not matching_rows:
        return JsonResponse({"error": f"No record found with id {id} in year {year}"}, status=404)

    # In all matching rows, get the total of both local and foreign
    total_local = 0
    total_all = 0

    for row in matching_rows:
        try:
            total_local += int(row.get("TotalLocal", "0").replace(",", ""))
            total_all += int(row.get("Total", "0").replace(",", ""))
        except ValueError:
            continue  # skip rows with invalid data

    return JsonResponse({
        "code": code_upper,
        "year": year,
        "total_local": total_local,
        "total_foreign": total_all
    })


