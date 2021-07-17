import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify

######################################################
#  Database Set UP- (Standby)
######################################################

# create engine to hawaii.sqlite
#engine = create_engine("sqlite:///Resources/hawaii.sqlite")

# reflect an existing database into a new model
#Base = automap_base()

# reflect the tables
#Base.prepare(engine, reflect = True)

# Save references to each table
    # Here I'm usnig Measurement as an example, but will replace with the actual name of the DF developed by Alejandro
    # Note: Reference each table here to be able to call after
#Measurement = Base.classes.measurement


######################################################
#  Flask Setup & Routes
######################################################
app = Flask(__name__)

@app.route("/")
def welcome():
    return (
        f"Test, Test"
    )
        

# @app.route("/api/v1.0/DataSet1")
# def DataSet1():
    # Create our session
    session = Session(engine)

    # Session Query example
    #results = session.query(Measurement.date, Measurement.prcp).filter(Measurement.date >= '2016-08-23').order_by(Measurement.date.desc()).all()
    
    # Close session
    session.close()
    
    # Create a dictionary from the row data and append to a list of date and precipitation (example)
#     prcpt = []
#     for date, prcp in results:
#         prcpt_dict = {}
#         prcpt_dict["date"] = date
#         prcpt_dict["prcp"] = prcp
#         prcpt.append(prcpt_dict)

#     return jsonify(prcpt)

# Can probably just return clean data with jsonify

# @app.route("/api/v1.0/DataSet2")
# def DataSet2():
    #Example 2
#     # Create our session
#     session = Session(engine)
    
#     # Session Query
#     unique_station = session.query(Measurement.station).group_by(Measurement.station).order_by(func.count(Measurement.station).desc()).all()
    
#     # closing session
#     session.close()
    
#     station_name = list(np.ravel(unique_station))

#     return jsonify(station_name)


if __name__ == '__main__':
    app.run(debug = True)