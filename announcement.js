(function() {
    if (!document.getElementById('font-iansui')) {
        const link1 = document.createElement('link'); link1.rel = 'preconnect'; link1.href = 'https://fonts.googleapis.com';
        const link2 = document.createElement('link'); link2.rel = 'preconnect'; link2.href = 'https://fonts.gstatic.com'; link2.crossOrigin = true;
        const link3 = document.createElement('link'); link3.id = 'font-iansui'; link3.rel = 'stylesheet';
        link3.href = 'https://fonts.googleapis.com/css2?family=Iansui&display=swap';
        document.head.appendChild(link1); document.head.appendChild(link2); document.head.appendChild(link3);
    }
    const styles = `
        :root { --ann-bg-color: transparent; --ann-text-color: #222222; --ann-link-color: #0044cc; --ann-focus-outline: 0.25rem solid #ffcc00; --ann-modal-overlay: rgba(0, 0, 0, 0.7); --ann-tag-bg: #f0f0f0; --ann-font: "Iansui", "Microsoft JhengHei", "Heiti TC", sans-serif; }
        #announcement-root { font-family: var(--ann-font); width: 100%; line-height: 1.5; font-size: 1rem; color: var(--ann-text-color); }
        #announcement-root * { box-sizing: border-box; font-family: inherit; }
        .ann-sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
        .ann-container { width: 100%; padding: 0 5px; }
        .ann-icon-img { height: 18px !important; width: auto !important; max-width: 40px !important; vertical-align: middle !important; border: none; display: inline-block; }
        .icon-top { margin-right: 4px; } .icon-new { margin-left: 6px; }
        .ann-toolbar { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 10px; border-bottom: 1px dashed #ccc; padding-bottom: 10px; }
        .ann-filter-group { display: flex; flex-wrap: wrap; gap: 6px; flex-grow: 1; }
        .ann-filter-btn { background-color: #fff; border: 2px solid var(--btn-color, #333); color: var(--btn-color, #333); padding: 4px 10px; font-size: 0.95rem; border-radius: 4px; cursor: pointer; transition: all 0.2s; font-weight: bold; display: inline-flex; align-items: center; gap: 6px; }
        .ann-filter-btn:hover { background-color: rgba(0,0,0,0.05); }
        .ann-filter-btn.active { background-color: var(--btn-color, #333); color: #fff; }
        .ann-count { background-color: #eee; color: #555; font-size: 0.85em; padding: 1px 6px; border-radius: 4px; min-width: 20px; text-align: center; }
        .ann-filter-btn.active .ann-count { color: #333; background-color: rgba(255,255,255,0.8); }
        .ann-search-btn { background-color: #005A8C; color: #fff; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 1rem; font-weight: bold; display: flex; align-items: center; gap: 5px; }
        .ann-search-btn:hover { background-color: #003F63; }
        .ann-search-panel { background-color: #f2f2f2; border: 1px solid #ddd; border-radius: 4px; padding: 15px; margin-bottom: 20px; display: none; }
        .ann-search-row { display: flex; flex-wrap: wrap; gap: 15px; margin-bottom: 10px; align-items: center; }
        .ann-search-item { display: flex; align-items: center; gap: 5px; }
        .ann-search-item label { font-weight: bold; color: #333; white-space: nowrap; }
        .ann-form-control { padding: 6px 8px; border: 1px solid #777; border-radius: 4px; font-size: 0.95rem; color: #222; }
        .ann-submit { background-color: #A30000; color: #fff; border: none; padding: 6px 15px; border-radius: 4px; cursor: pointer; font-weight: bold; }
        .ann-reset { background-color: #fff; color: #222; border: 2px solid #555; padding: 4px 15px; border-radius: 4px; cursor: pointer; font-weight: bold; }
        .ann-list { list-style: none; padding: 0; margin: 0; }
        .ann-item { border-bottom: 1px solid #eee; padding: 0.6rem 0.4rem; display: flex; align-items: center; gap: 0.8rem; }
        .ann-item:hover { background-color: rgba(0,0,0,0.03); }
        .ann-date { font-size: 1rem; color: #555; flex-shrink: 0; width: 11ch; }
        .ann-tags { display: flex; gap: 4px; flex-wrap: wrap; min-width: 80px; max-width: 25%; }
        .ann-tag { padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.9rem; white-space: nowrap; display: inline-block; cursor: default; }
        .ann-tag-dept { background-color: var(--ann-tag-bg); color: #333; }
        .ann-login { background-color: #555; color: #fff; padding: 1px 8px; border-radius: 4px; font-size: 0.9rem; margin-left: 8px; text-decoration: none; display: inline-block; vertical-align: middle; border: 1px solid #333; }
        .ann-title-wrap { flex-grow: 1; min-width: 0; }
        .ann-title-btn { background: none; border: none; padding: 0; font-size: 1.1rem; color: var(--ann-link-color); text-decoration: none; cursor: pointer; text-align: left; font-weight: normal; line-height: 1.5; display: inline-block; word-wrap: break-word; }
        .ann-title-btn:hover { color: #002266; text-decoration: underline; }
        .ann-title-btn:focus { outline: var(--ann-focus-outline); background-color: #000; color: #ffcc00; }
        .ann-pagination { display: flex; justify-content: center; align-items: center; gap: 5px; margin-top: 1.5rem; margin-bottom: 1rem; flex-wrap: wrap; }
        .ann-page-btn { padding: 8px 12px; border: 1px solid #777; background: #fff; color: var(--ann-link-color); cursor: pointer; text-decoration: none; font-size: 1rem; border-radius: 4px; min-width: 35px; font-weight: bold; }
        .ann-page-btn.active { background-color: var(--ann-link-color); color: #fff; border-color: var(--ann-link-color); }
        .ann-page-btn:disabled { color: #777; cursor: not-allowed; background-color: #eee; }
        .ann-modal-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: var(--ann-modal-overlay); display: none; justify-content: center; align-items: center; z-index: 99999; }
        .ann-modal-content { background: #fff; width: 90%; max-width: 70ch; max-height: 90vh; overflow-y: auto; padding: 1.5rem; border: 2px solid #000; border-radius: 0.5rem; position: relative; }
        .ann-close-btn { position: absolute; top: 15px; right: 15px; background: #d32f2f; color: #fff; border: none; width: 32px; height: 32px; border-radius: 4px; font-size: 1.5rem; padding: 0; text-align: center; cursor: pointer; display: flex; align-items: center; justify-content: center; }
        .ann-close-btn:hover { background: #b71c1c; }
        .ann-attach-area { background: #f4f4f4; padding: 1rem; border: 1px dashed #666; margin-top: 1rem; }
        .ann-attach-area a { color: var(--ann-link-color); font-weight: bold; display: inline-block; padding: 0.3rem; }
        @media (max-width: 700px) { .ann-item { flex-direction: column; align-items: flex-start; gap: 0.3rem; } .ann-date { width: auto; font-size: 0.9rem; margin-right: 10px; display: inline-block; } .ann-tags { margin-bottom: 4px; } .ann-search-row { flex-direction: column; align-items: stretch; } }
    `;
    const styleSheet = document.createElement("style"); styleSheet.textContent = styles; document.head.appendChild(styleSheet);

    let container = document.getElementById('announcement-root');
    if (!container) { container = document.createElement('div'); container.id = 'announcement-root'; document.body.appendChild(container); }
    container.innerHTML = `
        <div class="ann-container">
            <div id="ann-loading" role="status" style="padding:20px; text-align:center; color:#666;">↻ 公告載入中...</div>
            <div id="ann-toolbar" class="ann-toolbar"><nav id="ann-filter-group" class="ann-filter-group" aria-label="公告分類快速篩選"></nav><button id="ann-toggle-search" class="ann-search-btn" aria-expanded="false" title="開啟/關閉搜尋面板"><svg aria-hidden="true" style="width:16px;height:16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg> 資料檢索</button></div>
            <div id="ann-search-panel" class="ann-search-panel"><div class="ann-search-row"><div class="ann-search-item"><label for="ann-s-start">公告日期：</label><input type="date" id="ann-s-start" class="ann-form-control" title="起始日期"><span aria-hidden="true" style="margin:0 5px;">至</span><input type="date" id="ann-s-end" class="ann-form-control" title="結束日期"></div><div class="ann-search-item"><label for="ann-s-cat">類別：</label><select id="ann-s-cat" class="ann-form-control" title="選擇類別"><option value="">全部類別</option></select></div></div><div class="ann-search-row"><div class="ann-search-item" style="flex-grow:1;"><label for="ann-s-dept">處室：</label><select id="ann-s-dept" class="ann-form-control" title="選擇處室"><option value="">全部處室</option></select></div><div class="ann-search-item" style="flex-grow:2;"><label for="ann-s-key">關鍵字：</label><input type="text" id="ann-s-key" class="ann-form-control" placeholder="請輸入標題或內容關鍵字" title="請輸入關鍵字"></div><div class="ann-search-item"><button id="ann-btn-search" class="ann-submit" title="執行查詢">🔍 複合查詢</button><button id="ann-btn-reset" class="ann-reset" title="重置搜尋條件">重置</button></div></div></div>
            <ul id="ann-list" class="ann-list" aria-live="polite"></ul>
            <nav aria-label="分頁導航"><div id="ann-pagination" class="ann-pagination"></div></nav>
        </div>
        <div id="ann-modal" class="ann-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="ann-m-title">
            <div class="ann-modal-content">
                <button id="ann-m-close" class="ann-close-btn" title="關閉視窗">&times;</button>
                <div style="border-bottom: 2px solid #eee; margin-bottom: 1rem; padding-bottom: 0.5rem; padding-right: 30px;"><h2 id="ann-m-title" style="margin:0 0 10px 0; font-weight:normal;">公告詳細內容</h2><div style="color:#555; font-size: 0.95rem;"><span id="ann-m-dept"></span></div><div id="ann-m-period" style="color:#777; font-size: 0.9rem; margin-top: 5px;"></div></div>
                <div id="ann-m-body" style="white-space: pre-wrap; line-height: 1.8; font-size: 1.05rem;"></div>
                <div id="ann-m-links" class="ann-attach-area" style="display:none; background-color:#eefcfc; border-color:#008080;"><h3 style="margin:0 0 0.5rem 0; font-size:1rem;">🔗 參考網址：</h3><ul id="ann-m-link-list" style="padding-left:1.5rem; margin:0;"></ul></div>
                <div id="ann-m-attach" class="ann-attach-area" style="display:none;"><h3 style="margin:0 0 0.5rem 0; font-size:1rem;">📎 附件下載：</h3><ul id="ann-m-file-list" style="padding-left:1.5rem; margin:0;"></ul></div>
            </div>
        </div>
    `;

    const DATA_URL = "https://script.google.com/macros/s/AKfycbwpj87uChIU27uvVX_ssWMBRxrreL8OzGp5i3W5GoUdpThqQukqvrpajAsazAM9dC9C/exec";
    const LOCKED_CATEGORY_ID = null; const ITEMS_PER_PAGE = 10; const NEW_DAYS_LIMIT = 4;
    const IMG_TOP = `<img src="https://esa.ntpc.edu.tw/web-announce/images/top.png" alt="置頂" class="ann-icon-img icon-top" style="height:18px !important; width:auto !important; margin-right:4px; vertical-align:middle;">`;
    const IMG_NEW = `<img src="https://esa.ntpc.edu.tw/web-announce/images/news.svg" alt="最新" class="ann-icon-img icon-new" style="height:18px !important; width:auto !important; margin-left:6px; vertical-align:middle;">`;
    const CUSTOM_NAME_MAP = { "主計室": "會計室", "主計主任": "會計主任" };
    const CAT_MAP = { "2": "行政公告", "28": "補助及獎助學金", "29": "人事室公告", "30": "會計室公告", "31": "家長專區", "35": "性別平等", "36": "人權二公約", "37": "校內公告", "38": "人員甄選", "39": "幼兒園", "48": "體育賽事、活動", "156": "新生報到專區", "168": "安全棒球", "7": "研習公告", "34": "防疫專區" };
    const CAT_CONFIG = { "2": { color: "#8B4513" }, "28": { color: "#0056b3" }, "29": { color: "#800080" }, "30": { color: "#A0522D" }, "31": { color: "#006666" }, "35": { color: "#800040" }, "36": { color: "#006400" }, "37": { color: "#0044cc" }, "38": { color: "#5d4037" }, "39": { color: "#556B2F" }, "48": { color: "#2F4F4F" }, "156": { color: "#8B4513" }, "168": { color: "#4682B4" }, "7": { color: "#800000" }, "34": { color: "#e65100" } };
    const CAT_ORDER = ["2", "28", "29", "30", "31", "35", "36", "37", "38", "39", "48", "156", "168", "7"];
    const DEPT_LIST = ["校長室", "教務處", "學務處", "總務處", "輔導處", "人事室", "會計室"];
    let allData = [], filteredData = [], currentPage = 1, lastFocused = null;
    const el = { list: document.getElementById('ann-list'), loading: document.getElementById('ann-loading'), pagination: document.getElementById('ann-pagination'), filterGrp: document.getElementById('ann-filter-group'), toolbar: document.getElementById('ann-toolbar'), searchToggle: document.getElementById('ann-toggle-search'), searchPanel: document.getElementById('ann-search-panel'), sStart: document.getElementById('ann-s-start'), sEnd: document.getElementById('ann-s-end'), sCat: document.getElementById('ann-s-cat'), sDept: document.getElementById('ann-s-dept'), sKey: document.getElementById('ann-s-key'), btnSearch: document.getElementById('ann-btn-search'), btnReset: document.getElementById('ann-btn-reset'), modal: document.getElementById('ann-modal'), mTitle: document.getElementById('ann-m-title'), mDept: document.getElementById('ann-m-dept'), mPeriod: document.getElementById('ann-m-period'), mBody: document.getElementById('ann-m-body'), mLinks: document.getElementById('ann-m-links'), mLinkList: document.getElementById('ann-m-link-list'), mAttach: document.getElementById('ann-m-attach'), mFileList: document.getElementById('ann-m-file-list'), mClose: document.getElementById('ann-m-close') };
    
    function checkIsNew(d) { if(!d)return false; const p=d.split(' ')[0].split('.'); if(p.length!==3)return false; const dt=new Date(parseInt(p[0])+1911,parseInt(p[1])-1,parseInt(p[2])); return (new Date()-dt)/(1000*60*60*24)<=NEW_DAYS_LIMIT; }
    function parseRoc(s) { if(!s)return null; const p=s.split(' ')[0].split('.'); if(p.length<3)return null; return new Date(parseInt(p[0])+1911,parseInt(p[1])-1,parseInt(p[2])); }
    
    fetch(DATA_URL).then(r=>r.json()).then(json=>{
        if(json.status!=="success") throw new Error("GAS Error");
        el.loading.style.display='none';
        if(!json.data || json.data.length===0) { el.list.innerHTML="<li style='padding:10px'>目前沒有公告。</li>"; return; }
        allData = json.data.map(item => { if (item.department && CUSTOM_NAME_MAP[item.department]) item.department = CUSTOM_NAME_MAP[item.department]; if (item.job_title && CUSTOM_NAME_MAP[item.job_title]) item.job_title = CUSTOM_NAME_MAP[item.job_title]; return item; });
        if(LOCKED_CATEGORY_ID) { el.toolbar.style.display='none'; el.searchPanel.style.display='none'; applyFilter(LOCKED_CATEGORY_ID); } else { initFilters(); initSearch(); filteredData = allData; renderPage(1); }
    }).catch(e=>{ console.error(e); el.loading.innerHTML="<span style='color:red'>載入失敗</span>"; });
    
    function initFilters() {
        const counts = {}; let originalSystemAllCount = 0;
        allData.forEach(i => { if(i.category_ids && Array.isArray(i.category_ids)) { i.category_ids.forEach(c => { counts[c] = (counts[c]||0) + 1; originalSystemAllCount++; }); } else { originalSystemAllCount++; } });
        el.filterGrp.innerHTML=""; createBtn("all", originalSystemAllCount);
        CAT_ORDER.forEach(id => { if(CAT_MAP[id] && counts[id]>0) createBtn(id, counts[id]); });
    }
    function createBtn(id, count) {
        const name = id==="all"?"全部公告":CAT_MAP[id]; const color = id==="all"?"#333":(CAT_CONFIG[id]?.color||"#999");
        const btn = document.createElement('button'); btn.className = `ann-filter-btn ${id==='all'?'active':''}`; btn.style.setProperty('--btn-color', color); btn.title = `篩選：${name}，共 ${count} 則`; btn.innerHTML = `${name} <span class="ann-count">${count}</span>`;
        btn.onclick = () => { document.querySelectorAll('.ann-filter-btn').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); applyFilter(id); el.searchPanel.style.display='none'; }; el.filterGrp.appendChild(btn);
    }
    function initSearch() {
        const depts = new Set(DEPT_LIST); allData.forEach(i => { if(i.department) depts.add(i.department); });
        el.sDept.innerHTML='<option value="">全部處室</option>'; Array.from(depts).forEach(d => el.sDept.add(new Option(d,d)));
        el.sCat.innerHTML='<option value="">全部類別</option>'; CAT_ORDER.forEach(c => { if(CAT_MAP[c]) el.sCat.add(new Option(CAT_MAP[c], c)); });
    }
    function applyFilter(cat) { filteredData = (cat==='all') ? allData : allData.filter(i => i.category_ids && i.category_ids.includes(cat)); currentPage = 1; renderPage(1); }
    function doSearch() {
        const sd = el.sStart.value?new Date(el.sStart.value):null; const ed = el.sEnd.value?new Date(el.sEnd.value):null;
        const k = el.sKey.value.trim().toLowerCase(); const c = el.sCat.value, d = el.sDept.value;
        filteredData = allData.filter(i => {
            let m = true; if(sd||ed) { const idt = parseRoc(i.date); if(idt){ if(sd&&idt<sd)m=false; if(ed&&idt>ed)m=false; } }
            if(m&&c && (!i.category_ids || !i.category_ids.includes(c))) m=false; if(m&&d && i.department!==d) m=false; if(m&&k && !i.title.toLowerCase().includes(k)) m=false; return m;
        }); document.querySelectorAll('.ann-filter-btn').forEach(b=>b.classList.remove('active')); renderPage(1);
    }
    el.searchToggle.onclick = () => { const show = el.searchPanel.style.display === 'none' || el.searchPanel.style.display === ''; el.searchPanel.style.display = show ? 'block' : 'none'; el.searchToggle.setAttribute('aria-expanded', show); };
    el.btnSearch.onclick = doSearch; el.btnReset.onclick = () => { el.sStart.value=el.sEnd.value=el.sCat.value=el.sDept.value=el.sKey.value=""; applyFilter('all'); document.querySelector('.ann-filter-btn').classList.add('active'); };
    
    function renderPage(p) {
        currentPage = p; el.list.innerHTML="";
        if(filteredData.length===0) { el.list.innerHTML="<li style='padding:20px;text-align:center'>無資料</li>"; el.pagination.innerHTML=""; return; }
        const start = (p-1)*ITEMS_PER_PAGE; const pageItems = filteredData.slice(start, start+ITEMS_PER_PAGE);
        pageItems.forEach((item, idx) => {
            const li = document.createElement('li'); li.className='ann-item';
            const dateStr = item.date?item.date.split(' ')[0]:'-';
            let tags = ""; if(item.category_ids) item.category_ids.forEach(cid => { if(CAT_CONFIG[cid]) tags += `<span class="ann-tag" style="background:${CAT_CONFIG[cid].color};color:#fff">${CAT_MAP[cid]}</span>`; });
            if(!tags) tags = `<span class="ann-tag ann-tag-dept">${item.department}</span>`;
            let titleHtml = "";
            if(item.pub_view == "2") { 
                titleHtml = `<a href="https://esa.ntpc.edu.tw" target="_blank" class="ann-title-btn" title="需登入系統觀看：${item.title} (另開新視窗)">${item.is_top==1?IMG_TOP:''}${item.title}${checkIsNew(item.date)?IMG_NEW:''}</a> <a href="https://esa.ntpc.edu.tw" target="_blank" class="ann-login" title="須登入 (另開新視窗)">須登入</a>`; 
            } else { 
                titleHtml = `<button class="ann-title-btn" onclick="window.annOpen(${start+idx})" title="查看公告：${item.title}">${item.is_top==1?IMG_TOP:''}${item.title}${checkIsNew(item.date)?IMG_NEW:''}</button>`; 
            }
            li.innerHTML = `<div class="ann-date">${dateStr}</div><div class="ann-tags">${tags}</div><div class="ann-title-wrap">${titleHtml}</div>`;
            el.list.appendChild(li);
        });
        renderPager();
    }
    
    function renderPager() {
        el.pagination.innerHTML=""; const total = Math.ceil(filteredData.length/ITEMS_PER_PAGE); if(total<=1) return;
        const mkBtn = (txt, dis, go, lbl) => { 
            const b = document.createElement('button'); b.className=`ann-page-btn ${txt==currentPage?'active':''}`; 
            b.innerText=txt; b.disabled=dis; b.onclick=()=>renderPage(go); 
            if(lbl) b.setAttribute('aria-label', lbl); else b.setAttribute('aria-label', `第 ${txt} 頁`);
            el.pagination.appendChild(b); 
        };
        const gp = 10, curGp = Math.ceil(currentPage/gp), s = (curGp-1)*gp+1, e = Math.min(s+gp-1, total);
        if(s>1) mkBtn("<<", false, s-1, "上 10 頁"); mkBtn("<", currentPage===1, currentPage-1, "上一頁");
        for(let i=s; i<=e; i++) mkBtn(i, false, i);
        mkBtn(">", currentPage===total, currentPage+1, "下一頁"); if(e<total) mkBtn(">>", false, e+1, "下 10 頁");
    }
    
    window.annOpen = function(idx) {
        const item = filteredData[idx]; lastFocused = document.activeElement;
        el.mTitle.innerText = item.title; el.mDept.innerText = item.job_title ? `${item.department} / ${item.job_title}` : item.department;
        el.mPeriod.innerText = (item.date_start&&item.date_end) ? `公告期間：${item.date_start} ~ ${item.date_end}` : "";
        el.mBody.innerHTML = item.content_html;
        if(item.link_a||item.link_b) {
            el.mLinks.style.display='block'; let lh = "";
            // ★ 無障礙修正：連結加上(另開新視窗)
            if(item.link_a) lh += `<li><a href="${item.link_a}" target="_blank" title="參考網址1：${item.link_a} (另開新視窗)">參考網址1</a></li>`;
            if(item.link_b) lh += `<li><a href="${item.link_b}" target="_blank" title="參考網址2：${item.link_b} (另開新視窗)">參考網址2</a></li>`;
            el.mLinkList.innerHTML = lh;
        } else el.mLinks.style.display='none';
        
        if(item.attachments && item.attachments.length>0) {
            el.mAttach.style.display='block'; 
            // ★ 無障礙修正：附件加上(另開新視窗)
            el.mFileList.innerHTML = item.attachments.map(f=>`<li><a href="${f.url}" target="_blank" title="下載附件：${f.name} (另開新視窗)">下載：${f.name}</a></li>`).join('');
        } else el.mAttach.style.display='none';
        
        el.modal.style.display = 'flex'; el.mClose.focus(); document.body.style.overflow = 'hidden';
    };
    
    function close() { el.modal.style.display = 'none'; document.body.style.overflow = ''; if(lastFocused) lastFocused.focus(); }
    el.mClose.onclick = close; el.modal.onclick = (e) => { if(e.target === el.modal) close(); };
    
    // ★ 無障礙修正：彈跳視窗內的鍵盤焦點鎖定 (Focus Trap) ★
    el.modal.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') { close(); return; }
        if (e.key === 'Tab') {
            const focusableEls = el.modal.querySelectorAll('a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])');
            if (focusableEls.length === 0) return;
            const first = focusableEls[0]; const last = focusableEls[focusableEls.length - 1];
            if (e.shiftKey) { if (document.activeElement === first) { last.focus(); e.preventDefault(); } } 
            else { if (document.activeElement === last) { first.focus(); e.preventDefault(); } }
        }
    });
})();