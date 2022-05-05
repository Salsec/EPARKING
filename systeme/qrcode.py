import cv2
import numpy as np
from pyzbar.pyzbar import decode
from pyzbar.wrapper import ZBarSymbol


def read_qr_code(signal):
    if signal:
        cap = cv2.VideoCapture(0, cv2.CAP_DSHOW)
        cap.set(3, 640)
        cap.set(4, 480)
        eta = 0
        decode_data =""
        frame_name = "QR code SCANNER"
        while True:
            success, img = cap.read()

            if not success:
                break

            for code in decode(img, symbols=[ZBarSymbol.QRCODE]):
                decode_data = code.data.decode("utf-8")
                rect_pts = code.rect

                if decode_data:
                    pts = np.array([code.polygon], np.int32)
                    cv2.polylines(img, [pts], True, (0, 255, 0), 3)
                    cv2.putText(img, str(decode_data), (rect_pts[0], rect_pts[1]), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
                    eta = 1
            cv2.namedWindow(frame_name, cv2.WND_PROP_FULLSCREEN)

            cv2.imshow(frame_name, img)

            if (cv2.waitKey(1) == ord('q')) or (cv2.waitKey(1) and eta == 1):
                break
        cv2.destroyAllWindows()
    return decode_data
#print(read_qr_code(1))