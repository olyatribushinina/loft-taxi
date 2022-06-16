import { recordSaga } from "../helpers/recordSaga";
import { authenticateSaga, registrationSaga } from "./authSaga";
import { authenticate, registration } from "../actions/actions";
import { serverLogIn } from '../api/api';
import { act } from "@testing-library/react";

const data = {
	success: true,
	token: "testtoken"
}

jest.mock("../api/api");

describe("authSaga", () => {
	beforeEach(() => {
		jest.resetAllMocks()
	})

	describe("#AUTHENTICATE", () => {
		it("authenticates through api", async () => {

			serverLogIn.mockImplementation(() => (
				{ success: true, token: 'testtoken' }
			));

			const dispatched = await recordSaga(
				authenticateSaga,
				authenticate("testemail", "testpassword"),
			);

			act(() =>
				serverLogIn("testemail", "testpassword")
			);

			expect(serverLogIn).toBeCalledWith("testemail", "testpassword");

			expect(dispatched).toEqual([
				{ type: 'LOG_IN' },
				{ type: 'GET_TOKEN', 'token': 'testtoken' }
			])

		});
	});

});
