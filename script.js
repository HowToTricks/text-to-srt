function convertToSrt() {
    const text = document.getElementById('text-input').value;
    const srtContent = convertTextToSrt(text);
    
    // Create a blob and a download link
    const blob = new Blob([srtContent], { type: 'text/srt' });
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

    return srtContent;
}
