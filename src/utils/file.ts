
export const fileToBytes = async (files: File[]) => {
    let dataReturn: FileReturn[] = [];
    let error = null;

    const promises: Promise<FileReturn>[] = [];
    files.forEach((f) => {
        promises.push(new Promise<FileReturn>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const arrayBuffer = e.target?.result;
                if(arrayBuffer === null || arrayBuffer === undefined || typeof arrayBuffer === "string") {
                    reject(new Error("read file faild!"));
                } else {
                    const uint8Array = new Uint8Array(arrayBuffer);
                    resolve({
                        name: f.name,
                        format: f.type,
                        dataBytes: uint8Array,
                    });
                }
            }

            reader.readAsArrayBuffer(f);
        }))
    })

    await Promise.all(promises)
        .then((data: FileReturn[]) => {
            dataReturn = data;
        })
        .catch((err) => {
            error = err
        })

    return {
        dataReturn: dataReturn.map((d) => ({
            ...d,
            dataBytes: Array.from(d.dataBytes)
        })),
        error,
    };
}

export type FileReturn = {
    dataBytes: Uint8Array
    name: string
    format: string
}