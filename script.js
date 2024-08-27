function convertToSrt() {
    const text = document.getElementById('text-input').value;
    const srtContent = convertTextToSrt(text);
    
    // Convert the content to UTF-8 encoding explicitly
    const encoder = new TextEncoder();
    const utf8Content = encoder.encode(srtContent);

    // Create a blob and a download link with the correct MIME type
    const blob = new Blob([utf8Content], { type: 'text/srt;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const downloadLink = document.getElementById('download-link');
    downloadLink.href = url;
    downloadLink.download = 'subtitles.srt';
    downloadLink.style.display = 'block';
    downloadLink.textContent = 'Download SRT';
}

function convertTextToSrt(text) {
    const regex = /\[(.*?)\] (.*)/g;
    let match;
    let srtContent = '';
    let index = 1;

    while ((match = regex.exec(text)) !== null) {
        const [ , times, subtitleText ] = match;
        const [ startTime, endTime ] = times.split('->').map(t => t.trim().replace('.', ','));
        
        srtContent += `${index}\n${startTime} --> ${endTime}\n${subtitleText.trim()}\n\n`;
        index++;
    }

    // Ensure consistent line breaks (Unix LF)
    return srtContent.replace(/\r\n|\r/g, '\n');
}
