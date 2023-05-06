const validators = require("./validators.js");
// const { login } = require("./authController.js");
// const { updateUser } = require("../models/usersFunc.js");

// jest.mock("./authController", () => ({
//   login: jest.fn(() => {
//     console.log("Mocked login");
//   }),
// }));
// jest.mock("../models/usersFunc", () => ({
//   updateUser: jest.fn(() => {
//     console.log("Mocked update user");
//   }),
// }));
describe("validators", () => {
  test.each([
    { email: "test@test.test", expected: true },
    { email: "andrzej@mail.pl", expected: true },
    { email: "user@com", expected: false },
    { email: "nothingcom", expected: false },
    { email: "", expected: false },
  ])(
    "should validate email $email to be contain certain characters",
    ({ email, expected }) => {
      const result = validators.emailValidator(email);

      expect(result).toBe(expected);
    }
  );
  test.each([321, null, undefined, NaN, Infinity, true])(
    "email validator should throw error for non string value %p",
    (value) => {
      expect(() => {
        validators.emailValidator(value);
      }).toThrow(Error);
    }
  );
  test.each([
    "dckcodjs59fjrf?dsuw!gj",
    "ggjjvmfkdfvfgzdfb",
    "gt5g",
    "nothhfdsfhidfdfhudhfdhhhdfufdhvhfhfdughbfjgfnvjdvfnothhfdsfhidfdfhudhfdhhhdfufdhvhfhfdughbfjgfnvjdvfnothhfdsfhidfdfhudhfdhhhdfufdhvhfhfdughbfjgfnvjdvfseff",
    "",
  ])(
    "should validate password length to be within certain range",
    (password) => {
      const result = validators.passwordValidator(password);
      expect(result).not.toBeFalsy();
    }
  );
  test.each`
    subscription  | password                | email                  | token
    ${"pro"}      | ${"skdjifjf435fe5dr"}   | ${"andy@user.com"}     | ${true}
    ${"starter"}  | ${"skdjifjf4df35fe5dr"} | ${"malgo@user.pl"}     | ${true}
    ${"business"} | ${"skifjf435fe5dr"}     | ${"mati@mail.test"}    | ${true}
    ${"starter"}  | ${"skdjifcdjf435fe5dr"} | ${"gugugaga@viac.com"} | ${true}
  `(
    "should validate user with correct data",
    ({ subscription, password, email, token }) => {
      const user = { subscription, password, email, token };
      const result = validators.userValidator(user);

      expect(result).toBeTruthy();
      expect(result).toBe(true);
    }
  );

  test.each`
    user
    ${{
  subscription: "pro",
  password: "df",
  email: "andy@user.com",
  token: true,
}}
    ${{
  subscription: "pro",
  password: "skdjifjf4df35fe5dr",
  email: "andy@user",
  token: true,
}}
    ${{
  subscription: "pro",
  password: "nothhfdsfhidfdfhudhfdhhhdfufdhvhfhfdughbfjgfnvjdvfnothhfdsfhidfdfhudhfdhhhdfufdhvhfhfdughbfjgfnvjdvfnothhfdsfhidfdfhudhfdhhhdfufdhvhfhfdughbfjgfnvjdvfseff",
  email: "andy@user.com",
  token: true,
}}
    ${{
  subscription: "pro",
  password: "dj",
  email: "andy",
  token: true,
}}
    ${{
  subscription: "new",
  password: "dh",
  email: "andy",
  token: true,
}}
    ${{
  subscription: "new",
  password: "dh",
  email: "andy",
  token: false,
}}
    ${{
  subscription: null,
  password: null,
  email: null,
  token: null,
}}
  `("should throw for invalid user $user", ({ user }) => {
    expect(() => {
      validators.userValidator(user);
    }).toThrow(Error);
  });

  // it("data is update user", async () => {
  //   const user = { id, token };
  //   expect.assertions(1);
  //   await expect(
  //     updateUser("456tgc", {
  //       token: "dfhurnddjl34.andrr5yvhtbyvia.codfhy4554hdm",
  //     })
  //   ).resolves.toBe({ user });
  // });

  // it("the data is log-in user", async () => {
  //   expect.assertions(1);
  //   await expect(
  //     login("starter", "dfhurnddjl34", "andy@via.com")
  //   ).resolves.toBe("andy@via.com");
  // });

  // it("the fetch fails with an error", async () => {
  //   expect.assertions(1);
  //   await expect(login("new", "", "andy@via")).rejects.toMatch("error");
  // });
});
