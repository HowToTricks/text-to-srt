from flask import Flask, request, send_file
import io
import re

app = Flask(__name__)

# Function to convert text to SRT format
def convert_to_srt(text):
    # Regular expression to extract time and subtitle text
    pattern = re.compile(r'\[(.*?)\] (.*)')
    matches = pattern.findall(text)

    srt_content = ""
    for index, match in enumerate(matches):
        times = match[0].split("->")
        start_time = times[0].strip().replace('.', ',')
        end_time = times[1].strip().replace('.', ',')
        subtitle_text = match[1].strip()

        srt_content += f"{index + 1}\n{start_time} --> {end_time}\n{subtitle_text}\n\n"

    return srt_content

@app.route('/')
def index():
    return '''
    <html>
    <body>
        <h1>Text to SRT Converter</h1>
        <form action="/convert" method="post">
            <textarea name="text" rows="15" cols="70" placeholder="Enter your text with timestamps here..."></textarea><br>
            <input type="submit" value="Convert to SRT">
        </form>
    </body>
    </html>
    '''

@app.route('/convert', methods=['POST'])
def convert():
    text = request.form['text']
    srt_content = convert_to_srt(text)
    
    # Create an in-memory file
    srt_file = io.BytesIO()
    srt_file.write(srt_content.encode('utf-8'))
    srt_file.seek(0)
    
    # Serve the file as a download
    return send_file(srt_file, as_attachment=True, download_name="subtitles.srt", mimetype="text/srt")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
