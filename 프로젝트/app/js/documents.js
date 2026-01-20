// 문서 뷰어 기능

// 문서 목록 구조
const documentStructure = [
    {
        name: "00_마스터지침.md",
        label: "00. 마스터 지침",
        icon: "📋"
    },
    {
        name: "01_업무분석_요구사항정의.md",
        label: "01. 업무분석 및 요구사항 정의",
        icon: "📊"
    },
    {
        name: "02_페르소나.md",
        label: "02. 페르소나",
        icon: "👤"
    },
    {
        name: "03_사용자여정지도.md",
        label: "03. 사용자 여정지도",
        icon: "🗺️"
    },
    {
        name: "04_페인포인트분석.md",
        label: "04. Pain Point 분석",
        icon: "⚠️"
    },
    {
        name: "05_멘탈모형설계.md",
        label: "05. 멘탈모형 설계",
        icon: "🧠"
    },
    {
        name: "06_IA설계.md",
        label: "06. IA 설계",
        icon: "📐"
    },
    {
        name: "07_기능설계.md",
        label: "07. 기능 설계",
        icon: "⚙️"
    },
    {
        name: "08_UIUX설계.md",
        label: "08. UI/UX 설계",
        icon: "🎨"
    },
    {
        name: "09_프로토타입.md",
        label: "09. 프로토타입",
        icon: "🚀"
    }
];

// 문서 트리 렌더링
function renderDocumentsTree() {
    const treeContainer = document.getElementById('documents-tree');
    
    if (!treeContainer) return;
    
    const treeHTML = documentStructure.map((doc, index) => `
        <div class="tree-item tree-file" onclick="loadDocument('${doc.name}', ${index})">
            <span class="tree-item-icon">${doc.icon}</span>
            <span class="tree-item-label">${doc.label}</span>
        </div>
    `).join('');
    
    treeContainer.innerHTML = `
        <div class="tree-folder" style="padding: 8px 12px; margin-bottom: 8px; font-weight: 600; color: var(--text-primary);">
            📁 프로젝트 산출물
        </div>
        ${treeHTML}
    `;
}

// 문서 로드
async function loadDocument(filename, index) {
    try {
        // 트리 아이템 활성화
        document.querySelectorAll('.tree-item').forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });

        const modal = document.getElementById('document-modal');
        const modalBody = document.getElementById('document-modal-body');
        const modalTitle = document.getElementById('document-modal-title');

        if (!modal || !modalBody || !modalTitle) {
            console.error('모달 요소를 찾을 수 없습니다.');
            return;
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        modalBody.innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
                <p>문서를 불러오는 중...</p>
            </div>
        `;

        const response = await fetch(`/api/documents/${encodeURIComponent(filename)}`);
        if (!response.ok) {
            throw new Error('문서를 불러올 수 없습니다.');
        }

        const data = await response.json();
        const doc = documentStructure.find(d => d.name === filename);

        modalTitle.textContent = doc ? doc.label : filename;

        const html = renderMarkdown(data.content);
        modalBody.innerHTML = `
            <div class="markdown-content">
                ${html}
            </div>
        `;

        modalBody.scrollTop = 0;
    } catch (error) {
        console.error('문서 로드 오류:', error);
        const modalBody = document.getElementById('document-modal-body');
        if (modalBody) {
            modalBody.innerHTML = `
                <div class="document-placeholder">
                    <p>❌ 문서를 불러올 수 없습니다.<br>${error.message}</p>
                </div>
            `;
        }
    }
}

// 문서 모달 닫기
function closeDocumentModal() {
    const modal = document.getElementById('document-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ESC 키로 모달 닫기
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeDocumentModal();
    }
});

// 모달 배경 클릭 시 닫기
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('document-modal');
    if (modal) {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeDocumentModal();
            }
        });
    }
});

// 마크다운 렌더링 함수
function renderMarkdown(markdown) {
    if (!markdown) return '';
    
    let html = markdown;
    
    // 코드 블록 먼저 처리 (다른 변환에 영향받지 않도록)
    const codeBlockPlaceholders = [];
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
        const placeholder = `__CODE_BLOCK_${codeBlockPlaceholders.length}__`;
        codeBlockPlaceholders.push({
            placeholder,
            code: code.trim(),
            lang: lang || ''
        });
        return placeholder;
    });
    
    // 인라인 코드 (코드 블록이 아닌 것만)
    html = html.replace(/`([^`\n]+)`/g, '<code>$1</code>');
    
    // 구분선
    html = html.replace(/^---$/gim, '<hr>');
    html = html.replace(/^\*\*\*$/gim, '<hr>');
    
    // 테이블 처리
    const lines = html.split('\n');
    const processedLines = [];
    let inTable = false;
    let tableRows = [];
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmedLine = line.trim();
        
        // 테이블 행인지 확인
        if (trimmedLine.match(/^\|.+\|$/)) {
            if (!inTable) {
                inTable = true;
                tableRows = [];
            }
            tableRows.push(line);
        } else {
            // 테이블 종료
            if (inTable && tableRows.length > 0) {
                processedLines.push(renderTable(tableRows));
                tableRows = [];
                inTable = false;
            }
            processedLines.push(line);
        }
    }
    
    // 마지막 테이블 처리
    if (inTable && tableRows.length > 0) {
        processedLines.push(renderTable(tableRows));
    }
    
    html = processedLines.join('\n');
    
    // 헤더 변환
    html = html.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    
    // 인용구
    html = html.replace(/^> (.+)$/gim, '<blockquote>$1</blockquote>');
    
    // 리스트 처리
    html = html.replace(/^(\d+)\. (.+)$/gim, '<li>$2</li>');
    html = html.replace(/^[-*] (.+)$/gim, '<li>$1</li>');
    
    // 리스트 그룹화
    html = html.replace(/(<li>.*?<\/li>(\n|$))+/g, (match) => {
        return '<ul>' + match.trim() + '</ul>';
    });
    
    // 강조
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // 링크
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
    
    // 코드 블록 복원
    codeBlockPlaceholders.forEach(({ placeholder, code, lang }) => {
        const escapedCode = escapeHtml(code);
        html = html.replace(placeholder, `<pre><code class="language-${lang}">${escapedCode}</code></pre>`);
    });
    
    // 줄바꿈 처리
    const finalLines = html.split('\n');
    const result = [];
    let inParagraph = false;
    
    for (const line of finalLines) {
        const trimmed = line.trim();
        
        // 블록 요소는 단락 종료
        if (trimmed.match(/^<(h[1-6]|ul|ol|table|pre|blockquote|hr|div)/)) {
            if (inParagraph) {
                result.push('</p>');
                inParagraph = false;
            }
            result.push(line);
        }
        // 빈 줄은 단락 종료
        else if (trimmed === '') {
            if (inParagraph) {
                result.push('</p>');
                inParagraph = false;
            }
        }
        // 일반 텍스트
        else {
            if (!inParagraph) {
                result.push('<p>');
                inParagraph = true;
            }
            result.push(line);
        }
    }
    
    if (inParagraph) {
        result.push('</p>');
    }
    
    html = result.join('\n');
    
    // HTML 이스케이프 처리 (코드 블록과 인라인 코드는 이미 처리됨)
    html = html.replace(/<p>([^<]+)<\/p>/g, (match, text) => {
        // 이미 HTML 태그가 포함된 경우는 그대로
        if (text.includes('<')) return match;
        return '<p>' + escapeHtml(text) + '</p>';
    });
    
    return html;
}

// 테이블 렌더링 함수
function renderTable(rows) {
    if (rows.length < 2) return rows.join('\n');
    
    const headerRow = rows[0];
    const separatorRow = rows[1];
    const dataRows = rows.slice(2);
    
    const headerCells = headerRow.split('|').map(c => c.trim()).filter(c => c);
    const headerHTML = '<thead><tr>' + headerCells.map(cell => `<th>${escapeHtml(cell)}</th>`).join('') + '</tr></thead>';
    
    const bodyHTML = '<tbody>' + dataRows.map(row => {
        const cells = row.split('|').map(c => c.trim()).filter(c => c);
        return '<tr>' + cells.map(cell => `<td>${escapeHtml(cell)}</td>`).join('') + '</tr>';
    }).join('') + '</tbody>';
    
    return '<table>' + headerHTML + bodyHTML + '</table>';
}

// HTML 이스케이프 함수
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 페이지 로드 시 문서 트리 렌더링
if (document.getElementById('documents-tree')) {
    renderDocumentsTree();
}
