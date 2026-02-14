(function() {
    // --- 0. 自動載入字型 (Iansui) ---
    if (!document.getElementById('font-iansui')) {
        const link1 = document.createElement('link'); link1.rel = 'preconnect'; link1.href = 'https://fonts.googleapis.com';
        const link2 = document.createElement('link'); link2.rel = 'preconnect'; link2.href = 'https://fonts.gstatic.com'; link2.crossOrigin = true;
        const link3 = document.createElement('link'); link3.id = 'font-iansui'; link3.rel = 'stylesheet';
        link3.href = 'https://fonts.googleapis.com/css2?family=Iansui&display=swap';
        document.head.appendChild(link1); document.head.appendChild(link2); document.head.appendChild(link3);
    }

    // --- 1. CSS 樣式 (榮譽榜專用) ---
    const styles = `
        :root {
            --hr-focus-outline: 0.25rem solid #ffcc00; 
            --hr-link: #0044cc;
            --hr-badge-bg: #fff59d; 
            --hr-badge-text: #5d4037; 
            --hr-tag-bg: #f0f0f0;
            /* ★ 補回背景變灰的變數 ★ */
            --hr-modal-overlay: rgba(0, 0, 0, 0.7);
            --hr-font: "Iansui", "Microsoft JhengHei", sans-serif;
        }
        #honor-root { width: 100%; font-family: var(--hr-font); line-height: 1.5; color: #222; }
        #honor-root * { box-sizing: border-box; font-family: inherit; }
        
        .hr-sr-only { position: absolute; width: 1px; height: 1px; padding: 0; overflow: hidden; clip: rect(0,0,0,0); border: 0; }
        .hr-container { padding: 0 5px; }
        
        /* 分類按鈕樣式 */
        .hr-filter-sec { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 20px; border-bottom: 1px dashed #ccc; padding-bottom: 10px; }
        
        .hr-btn { 
            background: #fff; 
            border: 2px solid var(--btn-color,#333); 
            color: var(--btn-color,#333); 
            padding: 4px 10px; 
            font-size: 0.95rem; 
            border-radius: 4px; 
            cursor: pointer; 
            font-weight: bold; 
            transition: all 0.2s; 
            display: inline-flex; align-items: center; gap: 6px;
        }
        
        .hr-btn:hover { background: rgba(0,0,0,0.05); }
        
        .hr-btn.active { 
            background: var(--btn-color,#333); 
            color: #fff; 
        }
        
        .hr-btn:focus { 
            outline: none; 
            box-shadow: none;
        }
        
        .hr-count { background: #eee; color: #555; font-size: 0.85em; padding: 1px 6px; border-radius: 4px; min-width: 20px; text-align: center; }
        .hr-btn.active .hr-count { color: #333; background: rgba(255,255,255,0.8); }

        /* 列表 */
        .hr-list { list-style: none; padding: 0; margin: 0; }
        .hr-item { display: flex; gap: 20px; padding: 20px 0; border-bottom: 1px solid #eee; }
        
        /* 圖片容器與輪播 */
        .hr-img-box { 
            flex-shrink: 0; width: 220px; height: 155px; 
            position: relative; background: #fff; border: 1px solid #ddd; 
            display: flex; align-items: center; justify-content: center;
        }
        .hr-static-btn { width: 100%; height: 100%; padding: 0; border: 0; background: none; cursor: pointer; }
        .hr-thumb { width: 100%; height: 100%; object-fit: contain; padding: 3px; background: #fff; display: block; }
        .hr-static-btn:focus { outline: var(--hr-focus-outline); } 

        .hr-mc { width: 100%; height: 100%; position: relative; overflow: hidden; }
        .hr-mc-slide { width: 100%; height: 100%; position: absolute; top: 0; left: 0; display: none; cursor: pointer; background: #fff; }
        .hr-mc-slide.active { display: block; }
        .hr-mc-slide img { width: 100%; height: 100%; object-fit: contain; padding: 3px; background: #fff; }
        
        .hr-mc-ctl { 
            position: absolute; background: rgba(0,0,0,0.6); color: #fff; border: 0; 
            cursor: pointer; z-index: 5; display: flex; align-items: center; justify-content: center; 
            transition: background 0.2s;
        }
        .hr-mc-ctl:hover { background-color: rgba(0,0,0,0.85); }
        .hr-mc-ctl:focus { outline: var(--hr-focus-outline); background: #000; border: 2px solid #ffcc00; }
        
        .hr-play { top: 5px; left: 5px; width: 28px; height: 28px; border-radius: 50%; font-size: 0.8rem; }
        .hr-nav { top: 50%; transform: translateY(-50%); width: 30px; height: 50px; font-size: 1.2rem; background: rgba(0,0,0,0.3); }
        .hr-prev { left: 0; } .hr-next { right: 0; }

        /* 內容 */
        .hr-content { flex-grow: 1; min-width: 0; display: flex; flex-direction: column; }
        .hr-title-btn { background: none; border: 0; padding: 0; font-size: 1.25rem; color: #333; text-align: left; cursor: pointer; font-weight: bold; line-height: 1.4; }
        .hr-title-btn:hover { color: var(--hr-link); text-decoration: underline; }
        .hr-title-btn:focus { outline: var(--hr-focus-outline); background: #000; color: #ffcc00; text-decoration: underline; }
        
        .hr-desc { font-size: 1rem; color: #555; line-height: 1.6; margin: 8px 0; white-space: pre-wrap; word-break: break-word; }
        .hr-trunc { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
        .hr-more { color: var(--hr-link); cursor: pointer; background: none; border: 0; padding: 0; font-size: 0.95rem; }
        .hr-more:focus { outline: var(--hr-focus-outline); background: #000; color: #ffcc00; }

        .hr-meta { margin-top: auto; display: flex; gap: 8px; font-size: 0.9rem; color: #666; align-items: center; }
        .hr-tag { padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.85rem; cursor: default; }
        .hr-tag-dept { background: var(--hr-tag-bg); color: #333; }

        /* 分頁 */
        .hr-pager { display: flex; justify-content: center; gap: 5px; margin: 25px 0 20px; }
        .hr-pg-btn { padding: 8px 12px; border: 1px solid #ddd; background: #fff; color: var(--hr-link); cursor: pointer; border-radius: 4px; font-weight: bold; }
        .hr-pg-btn:hover { background: #eee; }
        .hr-pg-btn.active { background: var(--hr-link); color: #fff; border-color: var(--hr-link); }
        .hr-pg-btn:disabled { color: #ccc; cursor: not-allowed; }
        .hr-pg-btn:focus { outline: var(--hr-focus-outline); background: #000; color: #ffcc00; border-color: #ffcc00; }

        /* Modal 全螢幕與背景變灰 */
        .hr-modal-overlay { 
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; 
            background: var(--hr-modal-overlay); /* ★ 這裡引用了修正後的變數 ★ */
            display: none; justify-content: center; align-items: center; z-index: 99999; 
        }
        .hr-modal-content { background: #fff; width: 95%; max-width: 60rem; max-height: 90vh; overflow-y: auto; padding: 2rem; border-radius: 4px; border: 2px solid #000; position: relative; }
        
        .hr-close { 
            position: absolute; top: 15px; right: 15px; 
            background: #d32f2f; color: #fff; border: 0; 
            width: 32px; height: 32px; border-radius: 4px; 
            font-size: 1.5rem; cursor: pointer; 
            display: flex; align-items: center; justify-content: center; 
            z-index: 20; 
        }
        .hr-close:hover { background: #b71c1c; }
        .hr-close:focus { outline: none; background: #b71c1c; }

        .hr-m-head { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #eee; padding-bottom: 15px; margin-bottom: 20px; padding-right: 40px; }
        .hr-badge { display: inline-flex; align-items: center; gap: 5px; background: var(--hr-badge-bg); color: var(--hr-badge-text); padding: 6px 12px; font-weight: bold; font-size: 1rem; border-radius: 4px; }
        .hr-badge-icon { width: 18px; height: 18px; }
        .hr-photo-list { list-style: none; padding: 0; display: flex; flex-wrap: wrap; gap: 15px; margin-top: 15px; }
        .hr-photo-item img { height: 150px; border: 1px solid #ddd; padding: 3px; object-fit: contain; background: #fff; }
        
        @media (max-width: 768px) { .hr-item { flex-direction: column; } .hr-img-box { width: 100%; height: auto; aspect-ratio: 4/3; } .hr-m-head { flex-direction: column; align-items: flex-start; gap: 10px; } }
    `;
    const styleSheet = document.createElement("style");
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // --- 2. HTML 結構 ---
    let container = document.getElementById('honor-root');
    if (!container) {
        console.warn('找不到 id="honor-root"，自動建立。');
        container = document.createElement('div');
        container.id = 'honor-root';
        document.body.appendChild(container);
    }

    container.innerHTML = `
        <div class="hr-container">
            <div id="hr-loading" role="status" style="padding:20px; text-align:center; color:#666;">↻ 榮譽榜載入中...</div>
            <nav id="hr-filter" class="hr-filter-sec"></nav>
            <ul id="hr-list" class="hr-list" aria-live="polite"></ul>
            <nav aria-label="分頁"><div id="hr-pager" class="hr-pager"></div></nav>
        </div>
        <div id="hr-modal" class="hr-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="hr-m-title">
            <div class="hr-modal-content">
                <button id="hr-close" class="hr-close" title="關閉">&times;</button>
                <div class="hr-m-head">
                    <div style="display:flex; align-items:center; gap:15px; flex-wrap:wrap;">
                        <span class="hr-badge"><img src="https://esa.ntpc.edu.tw/web-heromgt/images/trophy.svg" class="hr-badge-icon" alt="">榮譽榜公告</span>
                        <div style="color:#888; font-size:0.95rem;"><span id="hr-m-dept"></span> <span id="hr-m-date" style="margin-left:5px;"></span></div>
                    </div>
                </div>
                <h2 id="hr-m-title" style="font-size:1.5rem; font-weight:bold; margin-bottom:20px;"></h2>
                <div id="hr-m-body" style="font-size:1.1rem; line-height:1.8; white-space:pre-wrap; color:#333;"></div>
                <div id="hr-m-photos" style="display:none; margin-top:30px;">
                    <div style="margin-bottom:15px;"><span class="hr-badge"><img src="https://esa.ntpc.edu.tw/web-heromgt/images/trophy.svg" class="hr-badge-icon" alt="">競賽照片</span></div>
                    <ul id="hr-photo-list" class="hr-photo-list"></ul>
                </div>
            </div>
        </div>
    `;

    // --- 3. 程式邏輯 ---
    const DATA_URL = "https://script.google.com/macros/s/AKfycbxlLrGfUegvnoHz7fyBSiytGI9LHF8e7NN9t9grpGV1j0hcRNhkLnMh4lLLRFAzFdv-9Q/exec"; // ★ 請確認網址
    const ITEMS_PER_PAGE = 3;
    const DEF_IMGS = ["https://esa.ntpc.edu.tw/web-heromgt/images/default_1.jpg", "https://esa.ntpc.edu.tw/web-heromgt/images/default_2.jpg", "https://esa.ntpc.edu.tw/web-heromgt/images/default_3.jpg", "https://esa.ntpc.edu.tw/web-heromgt/images/default_4.jpg", "https://esa.ntpc.edu.tw/web-heromgt/images/default_5.jpg"];
    const CAT_CONF = { "all": {color:"#337ab7"}, "10": {color:"#f39c12"}, "20": {color:"#00c0ef"}, "40": {color:"#9358ac"}, "50": {color:"#e91e63"}, "60": {color:"#8dc153"}, "70": {color:"#00a65a"}, "99": {color:"#e67e22"} };
    const CAT_NAME = { "all":"全部", "10":"國際", "20":"全國", "40":"縣市", "50":"區域", "60":"全校", "70":"年級", "99":"民間" };
    const CAT_ORDER = ["all", "10", "20", "40", "50", "60", "70", "99"];

    let allData=[], filteredData=[], curPage=1, curCat='all', mcState={}, intervals=[];
    
    // DOM
    const el = {
        list: document.getElementById('hr-list'), load: document.getElementById('hr-loading'),
        pager: document.getElementById('hr-pager'), filter: document.getElementById('hr-filter'),
        modal: document.getElementById('hr-modal'), mTitle: document.getElementById('hr-m-title'),
        mBody: document.getElementById('hr-m-body'), mDept: document.getElementById('hr-m-dept'),
        mDate: document.getElementById('hr-m-date'), mPhotos: document.getElementById('hr-m-photos'),
        pList: document.getElementById('hr-photo-list'), mClose: document.getElementById('hr-close')
    };

    fetch(DATA_URL).then(r=>r.json()).then(j=>{
        el.load.style.display='none';
        if(j.status!=="success"||!j.data) { el.list.innerHTML="<div style='text-align:center'>無資料</div>"; return; }
        allData = j.data;
        initFilter(); applyFilter('all');
    }).catch(()=>{ el.load.innerHTML="<span style='color:red'>載入失敗</span>"; });

    function initFilter() {
        const cnt = { "all": allData.length };
        allData.forEach(i => cnt[i.category_id] = (cnt[i.category_id]||0)+1);
        el.filter.innerHTML = "";
        CAT_ORDER.forEach(id => {
            if(CAT_CONF[id] && (id==='all'||(cnt[id]||0)>0)) {
                const btn = document.createElement('button');
                btn.className = `hr-btn ${id==='all'?'active':''}`;
                btn.style.setProperty('--btn-color', CAT_CONF[id].color);
                btn.title = `篩選分類：${CAT_NAME[id]}，共 ${cnt[id]||0} 則`;
                btn.innerHTML = `${CAT_NAME[id]} <span class="hr-count">${cnt[id]||0}</span>`;
                btn.onclick = () => {
                    document.querySelectorAll('.hr-btn').forEach(b=>b.classList.remove('active'));
                    btn.classList.add('active'); applyFilter(id);
                };
                el.filter.appendChild(btn);
            }
        });
    }

    function applyFilter(id) {
        curCat = id; filteredData = id==='all' ? allData : allData.filter(i=>i.category_id==id);
        curPage = 1; renderPage(1);
    }

    function renderPage(p) {
        intervals.forEach(clearInterval); intervals=[]; // 清除輪播
        curPage = p; el.list.innerHTML = "";
        if(filteredData.length===0) { el.list.innerHTML="<div style='padding:20px;text-align:center'>無資料</div>"; el.pager.innerHTML=""; return; }
        
        const start = (p-1)*ITEMS_PER_PAGE;
        const items = filteredData.slice(start, start+ITEMS_PER_PAGE);
        
        items.forEach((item, idx) => {
            const li = document.createElement('li'); li.className='hr-item';
            const date = item.date ? (item.date.length===8 ? `${item.date.substring(0,4)}-${item.date.substring(4,6)}-${item.date.substring(6,8)}` : item.date) : '';
            const catColor = CAT_CONF[item.category_id]?.color || '#999';
            const catName = CAT_NAME[item.category_id] || '榮譽';
            
            // 圖片邏輯
            let imgHtml = "";
            const imgs = item.images||[];
            if(imgs.length > 1) {
                const mid = `hr-mc-${item.id}-${idx}`;
                const slides = imgs.map((m,i)=>`<div class="hr-mc-slide ${i===0?'active':''}" onclick="window.hrOpen(${start+idx})"><img src="${m.url}" alt="照片 ${i+1}"></div>`).join('');
                imgHtml = `<div class="hr-img-box"><div class="hr-mc" id="${mid}" onmouseenter="window.hrPause('${mid}')" onmouseleave="window.hrResume('${mid}')">
                    <button class="hr-mc-ctl hr-play" onclick="window.hrToggle('${mid}',event)" aria-label="暫停輪播" title="暫停輪播">⏸</button>
                    <button class="hr-mc-ctl hr-nav hr-prev" onclick="window.hrPrev('${mid}',event)" aria-label="上一張" title="上一張">❮</button>
                    <button class="hr-mc-ctl hr-nav hr-next" onclick="window.hrNext('${mid}',event)" aria-label="下一張" title="下一張">❯</button>
                    ${slides}</div></div>`;
                setTimeout(()=>initMC(mid, imgs.length),0);
            } else {
                let src = (imgs.length===1) ? imgs[0].url : DEF_IMGS[(parseInt(item.id)||0)%5];
                imgHtml = `<div class="hr-img-box"><button class="hr-static-btn" onclick="window.hrOpen(${start+idx})"><img src="${src}" class="hr-thumb" alt="照片"></button></div>`;
            }

            // 內容截斷
            const descId = `desc-${item.id}`, btnId = `btn-${item.id}`;
            let desc = `<div class="hr-desc">${item.content||''}</div>`, more="";
            if(item.content && item.content.length>70) {
                desc = `<div id="${descId}" class="hr-desc hr-trunc">${item.content}</div>`;
                more = `<button id="${btnId}" class="hr-more" onclick="window.hrMore('${descId}','${btnId}')">顯示更多...</button>`;
            }

            li.innerHTML = `${imgHtml}<div class="hr-content"><div class="hr-title-row"><button class="hr-title-btn" onclick="window.hrOpen(${start+idx})">${item.title}</button></div>${desc}${more}<div class="hr-meta"><span class="hr-tag" style="background:${catColor};color:#fff">${catName}</span><span class="hr-tag hr-tag-dept">${item.dept}</span><span style="margin-left:auto">${date}</span></div></div>`;
            el.list.appendChild(li);
        });
        renderPager();
    }

    // 輪播功能
    function initMC(id, tot) { mcState[id]={c:0, t:tot, p:true, i:null}; startMC(id); }
    function startMC(id) { if(mcState[id].i) clearInterval(mcState[id].i); mcState[id].i = setInterval(()=>moveMC(id,1), 3000); intervals.push(mcState[id].i); }
    function stopMC(id) { if(mcState[id]&&mcState[id].i) { clearInterval(mcState[id].i); mcState[id].i=null; } }
    function moveMC(id, d) {
        const s = mcState[id]; if(!s) return;
        const div = document.getElementById(id); if(!div) return;
        const slides = div.querySelectorAll('.hr-mc-slide');
        slides[s.c].classList.remove('active');
        s.c = (s.c + d + s.t) % s.t;
        slides[s.c].classList.add('active');
    }
    
    // 全域函式
    window.hrPause = (id) => stopMC(id);
    window.hrResume = (id) => { if(mcState[id]?.p) startMC(id); };
    window.hrPrev = (id,e) => { e.stopPropagation(); moveMC(id,-1); };
    window.hrNext = (id,e) => { e.stopPropagation(); moveMC(id,1); };
    window.hrToggle = (id,e) => {
        e.stopPropagation(); const s = mcState[id], btn = e.currentTarget;
        if(s.p) { s.p=false; stopMC(id); btn.innerText="▶"; btn.setAttribute('aria-label', "播放輪播"); btn.title="播放輪播"; } 
        else { s.p=true; startMC(id); btn.innerText="⏸"; btn.setAttribute('aria-label', "暫停輪播"); btn.title="暫停輪播"; }
    };
    window.hrMore = (d,b) => { document.getElementById(d).classList.remove('hr-trunc'); document.getElementById(b).style.display='none'; };
    
    window.hrOpen = (idx) => {
        const i = filteredData[idx];
        el.mTitle.innerText = i.title; el.mBody.innerText = i.content;
        el.mDate.innerText = i.date; el.mDept.innerText = i.dept;
        if(i.images && i.images.length>0) {
            el.mPhotos.style.display='block';
            el.pList.innerHTML = i.images.map(m=>`<li class="hr-photo-item"><a href="${m.url}" target="_blank"><img src="${m.url}" alt="照片"></a></li>`).join('');
        } else el.mPhotos.style.display='none';
        el.modal.style.display='flex'; el.mClose.focus(); document.body.style.overflow='hidden';
    };

    el.mClose.onclick = () => { el.modal.style.display='none'; document.body.style.overflow=''; };
    el.modal.onclick = (e) => { if(e.target===el.modal) el.mClose.click(); };
    
    function renderPager() {
        el.pager.innerHTML=""; const tot = Math.ceil(filteredData.length/ITEMS_PER_PAGE); if(tot<=1) return;
        const mkBtn = (t,d,g) => { const b=document.createElement('button'); b.className=`hr-pg-btn ${t==curPage?'active':''}`; b.innerText=t; b.disabled=d; b.onclick=()=>renderPage(g); el.pager.appendChild(b); };
        const gp=10, cG=Math.ceil(curPage/gp), s=(cG-1)*gp+1, e=Math.min(s+gp-1, tot);
        if(s>1) mkBtn("<<", false, s-1); mkBtn("<", curPage===1, curPage-1);
        for(let i=s; i<=e; i++) mkBtn(i, false, i);
        mkBtn(">", curPage===tot, curPage+1); if(e<tot) mkBtn(">>", false, e+1);
    }
})();