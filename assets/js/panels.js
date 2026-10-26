(() => {
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    const group=button.closest('section');
    group.querySelectorAll('[data-filter]').forEach(item=>{item.classList.toggle('active',item===button);item.setAttribute('aria-pressed',String(item===button));});
    group.querySelectorAll('[data-category]').forEach(card=>{card.hidden=button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter;});
  }));

  const sectionLinks=[...document.querySelectorAll('.profile-nav [data-section]')];
  const sections=sectionLinks.map(link=>document.getElementById(link.dataset.section)).filter(Boolean);
  if(sections.length){
    const observer=new IntersectionObserver(entries=>{
      const visible=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top);
      if(!visible.length)return;
      sectionLinks.forEach(link=>{const current=link.dataset.section===visible[0].target.id;link.classList.toggle('is-current',current);if(current)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});
    },{rootMargin:'-8% 0px -58% 0px',threshold:0});
    sections.forEach(section=>observer.observe(section));
  }

  document.querySelectorAll('[data-tabs]').forEach((group,groupIndex)=>{
    const panels=[...group.querySelectorAll(':scope > .content-tab-panel')];
    if(!panels.length)return;
    const nav=document.createElement('div');nav.className='content-tab-list';nav.setAttribute('role','tablist');nav.setAttribute('aria-label','Content variations');
    const buttons=panels.map((panel,index)=>{
      const button=document.createElement('button');button.type='button';button.className='content-tab-button';button.textContent=panel.dataset.tabLabel||`Tab ${index+1}`;button.id=`panels-tab-${groupIndex}-${index}`;button.setAttribute('role','tab');
      panel.id=`panels-tabpanel-${groupIndex}-${index}`;panel.setAttribute('role','tabpanel');panel.setAttribute('aria-labelledby',button.id);panel.tabIndex=0;button.setAttribute('aria-controls',panel.id);nav.append(button);return button;
    });
    const select=index=>{buttons.forEach((button,i)=>{button.setAttribute('aria-selected',String(i===index));button.tabIndex=i===index?0:-1;panels[i].hidden=i!==index;});};
    buttons.forEach((button,index)=>{button.addEventListener('click',()=>select(index));button.addEventListener('keydown',event=>{let next=index;if(event.key==='ArrowRight')next=(index+1)%buttons.length;else if(event.key==='ArrowLeft')next=(index-1+buttons.length)%buttons.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=buttons.length-1;else return;event.preventDefault();select(next);buttons[next].focus();});});
    group.prepend(nav);group.classList.add('tabs-enhanced');select(0);
  });

  document.querySelectorAll('.highlight').forEach(block=>{
    const code=block.querySelector('code');if(!code)return;
    const button=document.createElement('button');button.type='button';button.className='copy-code';button.textContent='Copy';button.setAttribute('aria-label','Copy code');button.setAttribute('aria-live','polite');
    button.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(code.textContent);button.textContent='Copied';}catch{button.textContent='Copy unavailable';}window.setTimeout(()=>{button.textContent='Copy';},1800);});block.append(button);
  });

  const dialog=document.getElementById('photo-dialog');
  const links=[...document.querySelectorAll('[data-lightbox]')];
  if(!dialog||!links.length)return;
  let index=0,origin=null;
  const show=next=>{
    index=(next+links.length)%links.length;
    const link=links[index],source=link.querySelector('img'),image=dialog.querySelector('.lightbox-image');
    image.src=link.href;image.alt=source?.alt||link.dataset.caption||'';
    dialog.querySelector('.lightbox-footer h2').textContent=link.dataset.caption||image.alt;
    dialog.querySelector('.photo-position').textContent=`${index+1} / ${links.length}`;
    dialog.querySelectorAll('.photo-prev,.photo-next').forEach(button=>{button.hidden=links.length<2;});
  };
  links.forEach((link,i)=>link.addEventListener('click',event=>{event.preventDefault();origin=link;show(i);dialog.showModal();}));
  dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
  dialog.querySelector('.photo-prev').addEventListener('click',()=>show(index-1));
  dialog.querySelector('.photo-next').addEventListener('click',()=>show(index+1));
  dialog.addEventListener('close',()=>origin?.focus());
  dialog.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'){event.preventDefault();show(index-1);}if(event.key==='ArrowRight'){event.preventDefault();show(index+1);}});
  dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const box=dialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)dialog.close();});
})();
