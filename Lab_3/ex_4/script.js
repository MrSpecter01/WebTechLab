let activityLog = [];
let clickCount = 0;
const SPAM_THRESHOLD = 5; // Warn if 5+ clicks in 2 seconds

const logList = document.getElementById('logList');
const logTerminal = document.getElementById('logTerminal');

// 1. Centralized Log Function
function logActivity(type, target, details = "") {
    const entry = {
        time: new Date().toLocaleTimeString(),
        type: type,
        element: target,
        info: details
    };
    
    activityLog.push(entry);
    
    // Create DOM element for log
    const li = document.createElement('li');
    li.innerHTML = `[${entry.time}] <strong>${type}</strong> on &lt;${target}&gt; ${details}`;
    
    // Add to top of list
    logList.prepend(li);
    
    // Auto-scroll terminal
    logTerminal.scrollTop = 0;
}

// 2. Global Event Tracking (Event Bubbling)
document.addEventListener('click', (e) => {
    logActivity('CLICK', e.target.tagName, `ID: ${e.target.id}`);
    
    // Suspicious Activity Check (Rapid Clicking)
    clickCount++;
    if (clickCount >= SPAM_THRESHOLD) {
        logActivity('WARNING', 'SYSTEM', 'Suspicious activity: Click spamming detected!');
        const warningLi = logList.firstChild;
        warningLi.classList.add('warning');
    }
    
    // Reset click counter every 2 seconds
    setTimeout(() => { clickCount = 0; }, 2000);
});

document.addEventListener('keydown', (e) => {
    logActivity('KEYPRESS', 'WINDOW', `Key: ${e.key}`);
});

// 3. Focus and Blur (Tracking Focus Changes)
// Note: focus/blur don't bubble, so we use 'focusin'/'focusout'
document.addEventListener('focusin', (e) => {
    logActivity('FOCUS', e.target.tagName, `Target: ${e.target.id}`);
});

// 4. Reset Logic
document.getElementById('resetBtn').onclick = () => {
    activityLog = [];
    logList.innerHTML = "";
    alert("Log cleared.");
};

// 5. Export Logic (String Formatting)
document.getElementById('exportBtn').onclick = () => {
    let output = "USER ACTIVITY REPORT\n====================\n";
    activityLog.forEach(log => {
        output += `${log.time} | ${log.type} | ${log.element} | ${log.info}\n`;
    });
    
    // Create a temporary hidden download link
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "activity_log.txt";
    a.click();
};