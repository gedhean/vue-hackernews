import actions from "../actions";
import { fetchListData } from "../../api/api";
import flushPromises from "flush-promises";

jest.mock("../../api/api");

describe("Store actions", () => {
  test("fetchListData calls commit with SET_NEWS mutation and API fetchListData result", async () => {
    expect.assertions(1);
    const news = [{ id: 1 }, { id: 2 }];
    const payload = { type: "top" };
    const context = {
      commit: jest.fn()
    };

    fetchListData.mockImplementationOnce(calledWith =>
      calledWith === "top" ? Promise.resolve(news) : Promise.resolve([])
    );
    actions.fetchListData(context, payload);

    await flushPromises();

    expect(context.commit).toHaveBeenCalledWith("SET_NEWS", { news });
  });
});
