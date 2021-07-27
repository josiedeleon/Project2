import numpy as np
import csv
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify

######################################################
#  Database Set UP- (Standby)
######################################################

# create engine to hawaii.sqlite
#engine = create_engine("sqlite:///data/medals.sqlite")

# reflect an existing database into a new model
#Base = automap_base()

# reflect the tables
#Base.prepare(engine, reflect = True)

# Save references to each table
#Medals = Base.classes.country_medal_stats


######################################################
#  Flask Setup & Routes
######################################################
app = Flask(__name__)

@app.route("/")
def welcome():
    return (
        f"Test, Test <br/>"
        f"/api/v1.0/medals <br/>"
        f"/api/v1.0/height_avg"
    )

# @app.route("/api/v1.0/medals")
# def medals():
#     # Create our session
#     session = Session(engine)

#     # Session Query example
#     results = session.query(Medals.NOC).all()
    
#     # Close session
#     session.close()
    
#     medal_list = list(np.ravel(results))
    
    
#     return jsonify(medal_list)

@app.route("/api/v1.0/medals")
def medals():
    with open("./data/country_medal.csv", "r") as f:
        reader = csv.DictReader(f)
        medal_list = list(reader)
        return jsonify(medal_list)
    
@app.route("/api/v1.0/height_avg")
def heigt_avg():
    with open("./data/combined_height_avg.csv", "r") as f:
        reader = csv.DictReader(f)
        avg_height = list(reader)
        return jsonify(avg_height)

if __name__ == '__main__':
    app.run(debug = True)