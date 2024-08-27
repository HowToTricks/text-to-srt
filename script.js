document.getElementById('convertBtn').addEventListener('click', function() {
    const input = document.getElementById('inputText').value;
    const srtContent = convertToSrt(input);
    downloadSrtFile(srtContent);
});

function convertToSrt(inputText) {
    const regex = /\[(\d{2}:\d{2}\.\d{3}) -> (\d{2}:\d{2}\.\d{3})\] (.*?)\s*(?=\[|$)/g;
    let srtText = '';
    let counter = 1;

    let match;
    while ((match = regex.exec(inputText)) !== null) {
        const startTime = match[1].replace('.', ',');
        const endTime = match[2].replace('.', ',');
        const text = match[3];

        srtText += `${counter}\n`;
        srtText += `00:${startTime} --> 00:${endTime}\n`;
        srtText += `${text}\n\n`;

        counter++;
    }

    return srtText;
}

function downloadSrtFile(srtContent) {
    const blob = new Blob([srtContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'subtitles.srt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}