import { mapIndicator as reducer, initialState } from "./mapIndicator";

describe("mapIndicator reducer", () => {
  //initialState
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  //post
  it("posting mapIndicator", () => {
    expect(reducer(initialState, { type: "POSTING_INDICATOR" })).toEqual({
      ...initialState,
      posting: true,
      posted: false
    });
  });

  it("posted mapIndicator success", () => {
    expect(
      reducer(initialState, {
        type: "POSTED_INDICATOR_SUCCESS",
        indicator: {
          id: 1,
          name: "test1",
          icon: "123.png",
          lat: 50.3232,
          lng: 15.3213,
          street: "street1",
          city: "city1",
          country: "country1",
          userId: 1
        }
      })
    ).toEqual({
      ...initialState,
      posted: true,
      posting: false,
      indicators: [
        {
          id: 1,
          name: "test1",
          icon: "123.png",
          lat: 50.3232,
          lng: 15.3213,
          street: "street1",
          city: "city1",
          country: "country1",
          userId: 1
        }
      ]
    });

    expect(
      reducer(
        {
          ...initialState,
          indicators: [
            {
              id: 1,
              name: "test1",
              icon: "123.png",
              lat: 50.3232,
              lng: 15.3213,
              street: "street1",
              city: "city1",
              country: "country1",
              userId: 1
            }
          ]
        },
        {
          type: "POSTED_INDICATOR_SUCCESS",
          indicator: {
            id: 2,
            name: "test2",
            icon: "125.png",
            lat: 52.3232,
            lng: 17.3213,
            street: "street2",
            city: "city2",
            country: "country2",
            userId: 1
          }
        }
      )
    ).toEqual({
      ...initialState,
      posting: false,
      posted: true,
      indicators: [
        {
          id: 1,
          name: "test1",
          icon: "123.png",
          lat: 50.3232,
          lng: 15.3213,
          street: "street1",
          city: "city1",
          country: "country1",
          userId: 1
        },
        {
          id: 2,
          name: "test2",
          icon: "125.png",
          lat: 52.3232,
          lng: 17.3213,
          street: "street2",
          city: "city2",
          country: "country2",
          userId: 1
        }
      ]
    });
  });

  it("posted mapIndicator error", () => {
    expect(
      reducer(initialState, {
        type: "POSTED_INDICATOR_ERROR",
        error: "sth goes wrong"
      })
    ).toEqual({
      ...initialState,
      posted: false,
      posting: false,
      error: "sth goes wrong"
    });
  });
  //fetch
  it("fetching mapIndicators", () => {
    expect(reducer(initialState, { type: "FETCHING_INDICATORS" })).toEqual({
      ...initialState,
      fetching: true,
      fetched: false
    });
  });

  it("fetched mapIndicators success", () => {
    expect(
      reducer(initialState, {
        type: "FETCHED_INDICATORS_SUCCESS",
        indicators: [
          {
            id: 1,
            name: "test1",
            icon: "123.png",
            lat: 50.3232,
            lng: 15.3213,
            street: "street1",
            city: "city1",
            country: "country1",
            userId: 1
          },
          {
            id: 2,
            name: "test2",
            icon: "125.png",
            lat: 52.3232,
            lng: 17.3213,
            street: "street2",
            city: "city2",
            country: "country2",
            userId: 1
          }
        ]
      })
    ).toEqual({
      ...initialState,
      fetched: true,
      fetching: false,
      indicators: [
        {
          id: 1,
          name: "test1",
          icon: "123.png",
          lat: 50.3232,
          lng: 15.3213,
          street: "street1",
          city: "city1",
          country: "country1",
          userId: 1
        },
        {
          id: 2,
          name: "test2",
          icon: "125.png",
          lat: 52.3232,
          lng: 17.3213,
          street: "street2",
          city: "city2",
          country: "country2",
          userId: 1
        }
      ]
    });
  });

  it("fetched mapIndicators error", () => {
    expect(
      reducer(initialState, {
        type: "FETCHED_INDICATORS_ERROR",
        error: "sth goes wrong"
      })
    ).toEqual({
      ...initialState,
      fetched: false,
      fetching: false,
      error: "sth goes wrong"
    });
  });
  //remove
  it("removing mapIndicator", () => {
    expect(reducer(initialState, { type: "REMOVING_INDICATOR" })).toEqual({
      ...initialState,
      removing: true,
      removed: false
    });
  });

  it("removed mapIndicator success", () => {
    expect(
      reducer(
        {
          ...initialState,
          indicators: [
            {
              id: 1,
              name: "test1",
              icon: "123.png",
              lat: 50.3232,
              lng: 15.3213,
              street: "street1",
              city: "city1",
              country: "country1",
              userId: 1
            },
            {
              id: 2,
              name: "test2",
              icon: "125.png",
              lat: 52.3232,
              lng: 17.3213,
              street: "street2",
              city: "city2",
              country: "country2",
              userId: 1
            }
          ]
        },
        { type: "REMOVED_INDICATOR_SUCCESS", id: 1 }
      )
    ).toEqual({
      ...initialState,
      removed: true,
      removing: false,
      indicators: [
        {
          id: 2,
          name: "test2",
          icon: "125.png",
          lat: 52.3232,
          lng: 17.3213,
          street: "street2",
          city: "city2",
          country: "country2",
          userId: 1
        }
      ]
    });
  });

  it("removed mapIndicator error", () => {
    expect(
      reducer(initialState, {
        type: "REMOVED_INDICATOR_ERROR",
        error: "sth goes wrong"
      })
    ).toEqual({
      ...initialState,
      removed: false,
      removing: false,
      error: "sth goes wrong"
    });
  });

  it("isNavSelect", () => {
    expect(
      reducer(initialState, {
        type: "IS_SELECT",
        bool: false
      })
    ).toEqual({
      ...initialState,
      isNavSelect: false
    });

    expect(
      reducer(initialState, {
        type: "IS_SELECT",
        bool: true
      })
    ).toEqual({
      ...initialState,
      isNavSelect: true
    });
  });
});
