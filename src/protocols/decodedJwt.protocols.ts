type JwtError = {
    message: string
};

type DecodedJwt = {
    error?: JwtError,
    id: number
};

export default DecodedJwt;