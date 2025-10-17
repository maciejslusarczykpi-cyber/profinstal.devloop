"use client";
import React,{useState} from "react";

export default function ToggleChat(){
  const [open,setOpen]=useState(false);
  const [messages,setMessages]=useState<{role:"user"|"assistant",content:string}[]>([]);
  const [text,setText]=useState(""); const [busy,setBusy]=useState(false);

  const send = async () => {
    if (!text.trim()) return;
    const u = { role: "user" as const, content: text };
    setMessages(m=>[...m,u]); setText(""); setBusy(true);
    try {
      const r = await fetch("/api/devchat", {
        method: "POST",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify({ prompt: u.content })
      });
      const d = await r.json();
      setMessages(m=>[...m,{ role:"assistant", content: JSON.stringify(d,null,2) }]);
    } catch(e:any){
      setMessages(m=>[...m,{ role:"assistant", content:`Błąd: ${e?.message||e}` }]);
    } finally { setBusy(false); }
  };

  return (
    <div>
      <button style={{position:"fixed",bottom:24,right:24}} onClick={()=>setOpen(!open)}></button>
      {open && (
        <div style={{position:"fixed",bottom:96,right:24,width:380,maxHeight:520,background:"#fff",padding:12,border:"1px solid #e5e5e5",borderRadius:12,boxShadow:"0 12px 30px rgba(0,0,0,.15)"}}>
          <div style={{overflowY:"auto",maxHeight:380,marginBottom:8}}>
            {messages.map((m,i)=>(
              <div key={i} style={{marginBottom:8}}>
                <b>{m.role==="user"?"Ty":"Asystent"}</b>
                <pre style={{whiteSpace:"pre-wrap",margin:0}}>{m.content}</pre>
              </div>
            ))}
          </div>
          <div style={{display:"flex",gap:8}}>
            <input value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>e.key==="Enter"?send():undefined} style={{flex:1}} placeholder="Np. Dodaj sekcję Usługi"/>
            <button onClick={send} disabled={busy}>{busy?"...":"Wyślij"}</button>
          </div>
        </div>
      )}
    </div>
  );
}
