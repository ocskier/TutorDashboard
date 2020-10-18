import os, sys
import json
import time

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import unittest
import main


main.app.testing = True


class TestApi(unittest.TestCase):
    def test_main(self):
        with main.app.test_client() as client:
            result = client.get("/")
            self.assertEqual(result.data, b"Sanity check!")

    def test_currentTime(self):
        with main.app.test_client() as client:
            now = time.time()
            result = client.get("/current-time")
            # Decode byte string to utf8 and convert to json
            jsonResult = json.loads(result.data.decode("utf8").replace("'", '"'))
            self.assertEqual(round(jsonResult["time"]), round(now))


if __name__ == "__main__":
    unittest.main()
