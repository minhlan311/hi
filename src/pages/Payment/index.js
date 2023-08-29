import React, {useEffect, useState} from "react";
import PaymentCallback from "../../components/payments/callback";
const Payment = () => {
    const [queryParam, setQueryParam] = useState(null);
    useEffect(() => {
        const urlCallback = window.localStorage.getItem('urlCallback');
        const query = new URLSearchParams(new URL(urlCallback).search);
        const queryParam = {};
        for (let param of query.entries()) {
            queryParam[param[0]] = param[1];
        }
        setQueryParam(queryParam);
    }, [])
    return (
        <div>
            <PaymentCallback params={queryParam} />
        </div>
    );
}
export default Payment;