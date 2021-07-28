import numpy as np
import csv
from flask import Flask, jsonify
from flask_cors import CORS

######################################################
#  Flask Setup & Routes
######################################################

# Enable CORS
app = Flask(__name__)
CORS(app)


@app.route("/")
def welcome():
    return (
        f"Test, Test <br/>"
        f"/api/v1.0/medals <br/>"
        f"/api/v1.0/height_avg"
    )

# function will jsonify medal_list and we will use API in JS for mapping
@app.route("/api/v1.0/medals")
def medals():
    with open("./data/Merged_Cleaned_Lat_Long.csv", "r") as f:
        reader = csv.DictReader(f)
        medal_list = list(reader)
        return jsonify(medal_list)

# function will jsonify avg_heights of athletes and publish data 
@app.route("/api/v1.0/height_avg")
def heigt_avg():
    with open("./data/combined_height_avg.csv", "r") as f:
        reader = csv.DictReader(f)
        avg_height = list(reader)
        return jsonify(avg_height)

if __name__ == '__main__':
    app.run(debug = True)