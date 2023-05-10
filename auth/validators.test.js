const validators = require("./validators.js");

describe("validators", () => {
  //   test.each([
  //     { email: "test@test.test", expected: true },
  //     { email: "andrzej@mail.pl", expected: true },
  //     { email: "user@com", expected: false },
  //     { email: "nothingcom", expected: false },
  //     { email: "", expected: false },
  //   ])(
  //     "should validate email $email to be contain certain characters",
  //     ({ email, expected }) => {
  //       const result = validators.emailValidator(email);

  //       expect(result).toBe(expected);
  //     }
  //   );
  //   test.each([321, null, undefined, NaN, Infinity, true])(
  //     "email validator should throw error for non string value %p",
  //     (value) => {
  //       expect(() => {
  //         validators.emailValidator(value);
  //       }).toThrow(Error);
  //     }
  //   );
  //   test.each([
  //     "dckcodjs59fjrf?dsuw!gj",
  //     "ggjjvmfkdfvfgzdfb",
  //     "gt5g",
  //     "nothhfdsfhidfdfhudhfdhhhdfufdhvhfhfdughbfjgfnvjdvfnothhfdsfhidfdfhudhfdhhhdfufdhvhfhfdughbfjgfnvjdvfnothhfdsfhidfdfhudhfdhhhdfufdhvhfhfdughbfjgfnvjdvfseff",
  //     "",
  //   ])(
  //     "should validate password length to be within certain range",
  //     (password) => {
  //       const result = validators.passwordValidator(password);
  //       expect(result).not.toBeFalsy();
  //     }
  //   );
  //   test.each`
  //     subscription  | password                | email                  | token
  //     ${"pro"}      | ${"skdjifjf435fe5dr"}   | ${"andy@user.com"}     | ${true}
  //     ${"starter"}  | ${"skdjifjf4df35fe5dr"} | ${"malgo@user.pl"}     | ${true}
  //     ${"business"} | ${"skifjf435fe5dr"}     | ${"mati@mail.test"}    | ${true}
  //     ${"starter"}  | ${"skdjifcdjf435fe5dr"} | ${"gugugaga@viac.com"} | ${true}
  //   `(
  //     "should validate user with correct data",
  //     ({ subscription, password, email, token }) => {
  //       const user = { subscription, password, email, token };
  //       const result = validators.userValidator(user);

  //       expect(result).toBeTruthy();
  //       expect(result).toBe(true);
  //     }
  //   );

  //   test.each`
  //     user
  //     ${{
  //   subscription: "pro",
  //   password: "df",
  //   email: "andy@user.com",
  //   token: true,
  // }}
  //     ${{
  //   subscription: "pro",
  //   password: "skdjifjf4df35fe5dr",
  //   email: "andy@user",
  //   token: true,
  // }}
  //     ${{
  //   subscription: "pro",
  //   password: "nothhfdsfhidfdfhudhfdhhhdfufdhvhfhfdughbfjgfnvjdvfnothhfdsfhidfdfhudhfdhhhdfufdhvhfhfdughbfjgfnvjdvfnothhfdsfhidfdfhudhfdhhhdfufdhvhfhfdughbfjgfnvjdvfseff",
  //   email: "andy@user.com",
  //   token: true,
  // }}
  //     ${{
  //   subscription: "pro",
  //   password: "dj",
  //   email: "andy",
  //   token: true,
  // }}
  //     ${{
  //   subscription: "new",
  //   password: "dh",
  //   email: "andy",
  //   token: true,
  // }}
  //     ${{
  //   subscription: "new",
  //   password: "dh",
  //   email: "andy",
  //   token: false,
  // }}
  //     ${{
  //   subscription: null,
  //   password: null,
  //   email: null,
  //   token: null,
  // }}
  //   `("should throw for invalid user $user", ({ user }) => {
  //     expect(() => {
  //       validators.userValidator(user);
  //     }).toThrow(Error);
  //   });

  it.each`
    myUser
    ${{
  subscription: "new",
  password: "skdjifjf4df35fe5dr",
  email: "mark@user.com",
  token: null,
  userEmail: "mark@user.com",
  userPassword: "skdjifjf4df35fe5dr",
}}
    ${{
  subscription: "starter",
  password: "skddfjhncvdusf45",
  email: "andie@user.com",
  token: null,
  userEmail: "andie@user.com",
  userPassword: "skddfjhncvdusf45",
}}
    ${{
  subscription: "business",
  password: "skd5677dfjhncfgdvdusf45",
  email: "okrom@user.com",
  token: null,
  userEmail: "okrom@user.com",
  userPassword: "skd5677dfjhncfgdvdusf45",
}}
    ${{
  subscription: "pro",
  password: "skdjifjf4df35fe5dr",
  email: "mark@user.com",
  token: null,
  userEmail: "mark@user",
  userPassword: "skdjifjf4df35fe5dr",
}}
    ${{
  subscription: "pro",
  password: "skdjifjf4df35fe5dr",
  email: "mark@user.com",
  token: null,
  userEmail: "mark@user.com",
  userPassword: "skdjifjf4df35f",
}}
  `("should validate user with signin/login func", async ({ myUser }) => {
    expect.assertions();
    const result = validators.loginValidator(myUser);
    await expect(result).resolves.toBeTruthy();
    console.log("próby pomyslne", result);
  });
});
