import { check } from "express-validator";
import validationMsg from "../constants/validationMessages";
import { userController } from "../controllers";
import { Router } from "express";

const router = Router();

const PASSWORD_LENGTH = 8;

router.post(
  "/login",
  [
    check("username")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("Nombre de Usuario")),
    check("password")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("Contraseña")),
  ],
  userController.logIn.bind(userController)
);

router.post(
  "/register",
  [
    check("username")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("Nombre de Usuario")),
    check("email")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("Email")),
    check("password")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("Contraseña"))
      .isLength({ min: PASSWORD_LENGTH })
      .withMessage(validationMsg.PASSWORD_LENGTH_RESTRICTION(PASSWORD_LENGTH)),
    check("firstName")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("Nombre")),
    check("lastName")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("Apellido")),
    check("phoneNumber")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("Número de Teléfono")),
    check("location")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("Ciudad")),
  ],
  userController.create.bind(userController)
);

router.post(
  "/update",
  [
    check("userId")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("userId")),
  ],
  userController.update.bind(userController)
);

router.post(
  "/delete",
  [
    check("userId")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("userId")),
  ],
  userController.delete.bind(userController)
);

router.get("/:username", userController.findByUsername.bind(userController));

router.get("/users/:tourId", userController.getUsers.bind(userController));

router.get(
  "/user/:tourId/:category",
  userController.getRanking.bind(userController)
);

export default router;
