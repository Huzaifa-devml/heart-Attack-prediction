import sys
import json
import joblib
import numpy as np
import os
BASE_DIR=os.path.dirname(os.path.abspath(__file__))

model=joblib.load(os.path.join(BASE_DIR,"ml_models/heartrate_logistic.pkl"))
scaler=joblib.load(os.path.join(BASE_DIR,"ml_models/scaler1.pkl"))
columns=joblib.load(os.path.join(BASE_DIR,"ml_models/columns1.pkl"))

input_data=json.loads(sys.argv[1])
features=[input_data[col] for col in columns]
features=np.array(features).reshape(1,-1)
features=scaler.transform(features)
prediction=model.predict_proba(features)[0][1]
result="high" if prediction >= 0.35 else "low"
print(result)
