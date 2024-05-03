export default function hasLength(options: any, _value: any) {
    const { min, max } = options;
    let isError = false;
    let value = _value;

    if (typeof max === 'number' && value.length > max) {
        isError = true;
    }

    if (typeof min === "number" && value.length < min) {
        isError = true;
    }

    return isError;

}
