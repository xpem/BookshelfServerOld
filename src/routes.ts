import { Router } from "express";
import { BooksController } from "./controllers/BooksControllers";
import { ValidateUidByToken } from "./middlewares/IsAuthenticated";

/*
GET 	/device-management/devices       : Get all devices
POST 	/device-management/devices       : Create a new device

GET 	/device-management/devices/{id}   : Get the device information identified by "id"
PUT 	/device-management/devices/{id}   : Update the device information identified by "id"
DELETE	/device-management/devices/{id}   : Delete device by "id"
*/

const router = Router();
router.use(ValidateUidByToken);

router.get("/", async (req, res) => {
  return res.status(200).json({
    message: "I'm awake!",
  });
});

router.get("/Book/GetByLastUpdate", new BooksController().GetBooksByLastUpdate);

router.post("/Book", new BooksController().InsertBook);

router.put("/Book/:bookKey", new BooksController().UpdateBook);

export { router };
