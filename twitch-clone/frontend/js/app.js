// minimal: load channels
async function load() {
  try{
    const res = await fetch('/api/channels');
    const list = await res.json();
    const feed = document.getElementById('feed');
    if(!list.length) feed.innerHTML = '<p>No channels. Open <a href="/channel.html?s=demo">demo</a></p>';
    else feed.innerHTML = list.map(c=>`<div><a href="/channel.html?s=${c.streamKey}">${c.title}</a></div>`).join('');
  }catch(e){
    document.getElementById('feed').innerHTML = '<p>Failed to load channels.</p>';
  }
}
load();
