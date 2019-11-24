
import os


class Constants:
    TMP_DIR = os.path.dirname(os.path.abspath(__file__)) + "/Datasets/tmp"
    driving = "driving"
    walking = "walking"
    bike = "bicycling"
    public_transport = "transit"
    list_of_transports = ["driving", "walking", "bicycling", "transit"]
