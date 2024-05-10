import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'



const SandboxOutputWindow = () => {

    const [src, setSrc] = useState('');
    const html = useSelector((state) => state.code.html)
    const css = useSelector(state => state.code.css)
    const js = useSelector(state => state.code.js)

    const srcCode = `
        <html>
            <body>${html}</body>
            <style>${css}</style>
            <script>${js}</script>
        </html>
    `

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSrc(srcCode);
        }, 250);

        return () => clearTimeout(timeout);
    }, [html, css, js, srcCode])

    return (
        <div className = {`items-start mb-2 mr-2 ml-2 h-[calc(100vh-70px-49vh)] rounded-md ${html || css || js ? null : 'bg-#444857'}`}>
            <iframe 
                className='rounded-md'
                srcDoc={src}
                title="output"
                sandbox="allow-scripts"
                width="100%"
                height="100%"
            />    
        </div>
    )
}

export default SandboxOutputWindow;