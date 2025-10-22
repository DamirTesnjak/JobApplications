export function getFile(file: {
    name: string;
    data: string;
    contentType: string;
}) {
    const { name, data, contentType } = file;
    const fileType = contentType?.split('/')[1];

    if (fileType === 'pdf') {
        // Create new tag for download file
        const anchor = document.createElement('a');
        anchor.download = `${name}.${fileType}`;
        anchor.href = 'data:application/octet-stream;base64,' + data;
        anchor.dataset["downloadurl"] = [
            contentType,
            anchor.download,
            anchor.href,
        ].join(':');
        anchor.click();

        // Remove URL.createObjectURL. The browser should not save the reference to the file.
        setTimeout(() => {
            // For Firefox it is necessary to delay revoking the ObjectURL
            URL.revokeObjectURL(anchor.href);
        }, 100);
    } else {
        return 'data:application/octet-stream;base64,' + data;
    }
    return;
}
