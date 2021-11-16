import { useEffect } from "react";

import { apiGetAll, apiPost, apiDelete, apiPut } from "./api";

export const Test = () => {
    // const endpoint = 'https://api.vschool.io/geoffdavis/thing';
    // const endpoint = 'https://script.google.com/macros/s/AKfycbxIGots5D2tEKKYDKQE3VaEbcOuHEKKGLOAdrUzPV7qu3sYXeQ/exec';
    // const endpoint = 'https://script.google.com/macros/s/AKfycbwQhqMtod-exnEzYmFkG21NyrTfGT5VGjlOkf0XdzYoHbKEa4SWxEWRIGsshWZCsUtM/exec';
    // const endpoint = 'https://script.google.com/macros/s/AKfycby5jQlRf_SY-4rhRcvJ3WtkNEAEzz69njq-xc9TKxyfbrX6gloSxKdzzzxjt-DDifjn/exec';
    // const endpoint = 'https://script.google.com/macros/s/AKfycbzvRsT3_YSvueZtFFBSmIZnhQ5yPxz0rkumBaxNSuAZReNBFS7N1lAQmfZTkn8HNpk/exec';
    // const endpoint = 'https://script.google.com/macros/s/AKfycbyv-heN5gKUPzRW4Prua0g9cEsdCeuUUDCH1gKmKQeS5GVMvBdNPUY1z8KNAHBw3SLy/exec';
    // const endpoint = 'https://script.google.com/macros/s/AKfycbxVSNQwgW7cPOdRqc1KQ7XXHlcZSdh6vc6hoWHm-8OLRjNwF8Hu9o-8NNawXfYi_XuJ/exec';
    // const endpoint = 'https://script.google.com/macros/s/AKfycbyp5sDXFOjDW-_sQ6Ek_6AJpseLilc7JTtuCygWHIgq3X2XMHeyKpTCRVbZuGqmq4k/exec';
    const endpoint = 'https://script.google.com/macros/s/AKfycbwGL3x-NEKvNR48zA_tcTtzLrF6rnoiMvgmhcSLUWtsDTSE2aJ9EwlsOZpG-ZPArXJT/exec';


    // setTimeout(() => getAllThings(), 1000);
    const getAllThings = async () => {
        const { status, data } = await apiGetAll(endpoint);
        if (status === 200) {
            console.log(data);
        }
    };

    // setTimeout(() => testPost(), 1000);
    const testPost = async () => {
        const obj = JSON.stringify( { name: "Benita" });
        const { status, data } = await apiPost(endpoint, obj);
        if (status === 200) {
            console.log(`The status: ${status}`);
            console.log(data);
        }
    };

    // setTimeout(() => testPut(), 1000);
    const testPut = async () => {
        const obj = JSON.stringify( { name: "Test" });
        const { status, data } = await apiPut(endpoint, obj);
        if (status === 200) {
            console.log(`The status: ${status}`);
            console.log(data);
        }
    };

};