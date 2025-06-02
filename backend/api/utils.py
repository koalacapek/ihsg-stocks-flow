import csv
import os
from typing import List, Dict

def load_txt_files_by_year(data_dir: str, year: str) -> List[Dict]:
    """
    Load all .txt files in the given directory that start with the specified year.
    Returns a combined list of rows as dictionaries.
    """
    data = []
    year = str(year)

    for filename in os.listdir(data_dir):
        if filename.endswith(".txt") and filename.startswith(year):
            filepath = os.path.join(data_dir, filename)
            with open(filepath, newline='', encoding='utf-8') as f:
                reader = csv.DictReader(f, delimiter='|')
                for row in reader:
                    row['__source_file'] = filename  # optional
                    data.append(row)

    return data