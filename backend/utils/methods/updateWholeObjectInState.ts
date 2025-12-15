export default function updateWholeObjectInState(state: any, payload: any) {
    return {
        ...state,
        ...payload,
    };
}