(() => {
  document.querySelectorAll('[data-header-dropdown]').forEach(dropdown => {
    const trigger=dropdown.querySelector('summary');
    const panel=dropdown.querySelector('.socket-dropdown-panel');
    const supportsPopover=typeof panel.showPopover==='function';
    trigger.setAttribute('aria-controls',panel.id);
    trigger.setAttribute('aria-expanded','false');
    if(supportsPopover){panel.setAttribute('popover','auto');panel.classList.add('socket-popup');}
    const position=()=>{
      if(!supportsPopover||!dropdown.open)return;
      const box=trigger.getBoundingClientRect();
      if(box.bottom<=0||box.top>=innerHeight){close();return;}
      const width=Math.min(300,innerWidth-24);
      panel.style.width=`${width}px`;
      panel.style.maxHeight=`${innerHeight-24}px`;
      const height=panel.getBoundingClientRect().height;
      panel.style.left=`${Math.max(12,Math.min(box.right-width,innerWidth-width-12))}px`;
      panel.style.top=`${box.bottom+8+height<=innerHeight-12?box.bottom+8:Math.max(12,box.top-height-8)}px`;
    };
    const close=(restoreFocus=false)=>{
      if(supportsPopover&&panel.matches(':popover-open'))panel.hidePopover();
      dropdown.open=false;trigger.setAttribute('aria-expanded','false');
      if(restoreFocus)trigger.focus();
    };
    const open=()=>{
      dropdown.open=true;trigger.setAttribute('aria-expanded','true');
      if(supportsPopover&&!panel.matches(':popover-open'))panel.showPopover();
      position();
    };
    if(supportsPopover){
      trigger.addEventListener('click',event=>{event.preventDefault();dropdown.open?close():open();});
      panel.addEventListener('toggle',event=>{if(event.newState==='closed'){dropdown.open=false;trigger.setAttribute('aria-expanded','false');}});
    }
    dropdown.addEventListener('toggle',()=>{
      trigger.setAttribute('aria-expanded',String(dropdown.open));
      if(!dropdown.open&&supportsPopover&&panel.matches(':popover-open'))panel.hidePopover();
    });
    trigger.addEventListener('keydown',event=>{
      if(event.key!=='ArrowDown'&&event.key!=='ArrowUp')return;
      event.preventDefault();open();
      const links=panel.querySelectorAll('a');
      (event.key==='ArrowDown'?links[0]:links[links.length-1])?.focus();
    });
    dropdown.addEventListener('keydown',event=>{if(event.key==='Escape'&&dropdown.open){event.preventDefault();event.stopPropagation();close(true);}});
    dropdown.addEventListener('focusout',event=>{if(dropdown.open&&event.relatedTarget&&!dropdown.contains(event.relatedTarget))close();});
    panel.addEventListener('click',event=>{if(event.target.closest('a'))close();});
    document.addEventListener('pointerdown',event=>{if(dropdown.open&&!dropdown.contains(event.target))close();});
    window.addEventListener('resize',position);
    window.addEventListener('scroll',position,{capture:true,passive:true});
  });

  document.querySelectorAll('[data-ticker]').forEach(module => {
    const toggle=module.querySelector('[data-ticker-toggle]');
    const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion=()=>{module.classList.toggle('is-scrolling',!reducedMotion.matches);toggle.hidden=reducedMotion.matches;};
    updateMotion();reducedMotion.addEventListener('change',updateMotion);
    toggle.addEventListener('click',()=>{
      const paused=module.classList.toggle('is-paused');
      toggle.setAttribute('aria-pressed',String(paused));
      toggle.setAttribute('aria-label',paused?'Resume scrolling message':'Pause scrolling message');
      toggle.firstElementChild.textContent=paused?'▶':'Ⅱ';
    });
  });

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
