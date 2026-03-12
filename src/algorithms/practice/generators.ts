import type { VizConfig, VizStep, VizPointer, VizInputField } from './vizTypes'

// ─── Colours ─────────────────────────────────────────────────────────────────
const N  = '#475569'   // neutral
const LP = '#2563eb'   // left / slow pointer
const RP = '#ea580c'   // right / fast pointer
const MP = '#ca8a04'   // mid / current
const FX = '#9333ea'   // fixed outer pointer i
const OK = '#16a34a'   // match / found
const NO = '#dc2626'   // mismatch / removed
const WN = '#0284c7'   // window
const DN = '#059669'   // done
const DM = '#1e293b'   // dimmed
const HL = '#b45309'   // highlight build

const CL: Record<string, string> = {
  L: '#60a5fa', R: '#fb923c', M: '#fbbf24',
  S: '#60a5fa', F: '#fb923c', i: '#c084fc', W: '#38bdf8',
}
function ptr(index: number, label: string): VizPointer {
  return { index, label, color: CL[label] ?? '#94a3b8' }
}
function s(
  cells: (string|number)[], colors: string[], pointers: VizPointer[],
  description: string, vars?: [string, string|number][],
  opts?: Partial<Pick<VizStep,'phase'|'result'|'windowRange'|'secondCells'|'secondCellColors'|'secondLabel'>>
): VizStep {
  return { cells, cellColors: colors, pointers, description, variables: vars, ...opts }
}

// ─── Parse helpers ────────────────────────────────────────────────────────────
function parseArr(raw: string, maxLen = 10): number[] {
  const cleaned = raw.trim().replace(/^\[/, '').replace(/\]$/, '').trim()
  if (!cleaned) throw new Error('Array cannot be empty')
  const parts = cleaned.split(/[\s,]+/).filter(Boolean)
  if (parts.length > maxLen) throw new Error(`Max ${maxLen} elements`)
  const nums = parts.map(p => {
    const n = parseFloat(p)
    if (isNaN(n)) throw new Error(`"${p}" is not a number`)
    return n
  })
  return nums
}
function parseNum(raw: string, min = -1e6, max = 1e6): number {
  const n = parseFloat(raw.trim())
  if (isNaN(n)) throw new Error(`"${raw}" is not a number`)
  if (n < min || n > max) throw new Error(`Value must be between ${min} and ${max}`)
  return n
}
function parseStr(raw: string, maxLen = 20): string {
  const v = raw.trim().replace(/^["']|["']$/g, '')
  if (!v) throw new Error('String cannot be empty')
  if (v.length > maxLen) throw new Error(`Max ${maxLen} characters`)
  return v
}

// ─── #125  Valid Palindrome ───────────────────────────────────────────────────
function steps125(input: string): VizStep[] {
  const chars = input.toLowerCase().replace(/[^a-z0-9]/g, '').split('')
  if (chars.length === 0) return [s([], [], [], 'Empty string after filtering → true', [], { phase: 'Done', result: 'true' })]
  const n = chars.length
  const steps: VizStep[] = []
  const base = () => chars.map(() => N)

  steps.push(s(chars, (() => { const c = base(); c[0]=LP; c[n-1]=RP; return c })(),
    [ptr(0,'L'), ptr(n-1,'R')],
    `Filtered: "${chars.join('')}". Left=0, Right=${n-1}.`,
    [['left',0],['right',n-1]], { phase:'Init' }))

  let l=0, r=n-1
  while (l < r) {
    const c = base()
    for (let i=0;i<l;i++) c[i]=DN; for (let i=r+1;i<n;i++) c[i]=DN
    const match = chars[l]===chars[r]
    c[l]=match?OK:NO; c[r]=match?OK:NO
    steps.push(s(chars, c, [ptr(l,'L'), ptr(r,'R')],
      match ? `'${chars[l]}' == '${chars[r]}' ✓  Move both inward.`
            : `'${chars[l]}' != '${chars[r]}' ✗  Not a palindrome.`,
      [['left',l],['right',r]], { phase: match?'Match':'Mismatch', result: match?undefined:'false' }))
    if (!match) return steps
    l++; r--
  }
  steps.push(s(chars, chars.map(()=>DN), [],
    `left(${l}) ≥ right(${r}) — all matched!`, [['left',l],['right',r]],
    { phase:'Done', result:`true — "${input}" is a palindrome` }))
  return steps
}

// ─── #167  Two Sum II ────────────────────────────────────────────────────────
function steps167(nums: number[], target: number): VizStep[] {
  const sorted = [...nums].sort((a,b)=>a-b)
  const n = sorted.length
  const steps: VizStep[] = []
  steps.push(s(sorted, (() => { const c=sorted.map(()=>N); c[0]=LP; c[n-1]=RP; return c })(),
    [ptr(0,'L'),ptr(n-1,'R')],
    `Sorted array. target=${target}.`, [['left',0],['right',n-1],['target',target]], {phase:'Init'}))
  let l=0, r=n-1
  while (l<r) {
    const sum=sorted[l]+sorted[r]
    const c=sorted.map(()=>N)
    if(sum===target){c[l]=OK;c[r]=OK}else if(sum>target){c[l]=LP;c[r]=NO}else{c[l]=NO;c[r]=RP}
    const msg=sum===target?`${sorted[l]}+${sorted[r]}=${sum} == ${target} ✓  Found!`
      :sum>target?`${sorted[l]}+${sorted[r]}=${sum} > ${target}  →  R--`
      :`${sorted[l]}+${sorted[r]}=${sum} < ${target}  →  L++`
    steps.push(s(sorted,c,[ptr(l,'L'),ptr(r,'R')],msg,
      [['left',l],['right',r],['sum',sum],['target',target]],
      {phase:sum===target?'Found':'Move',result:sum===target?`[${l+1},${r+1}]`:undefined}))
    if(sum===target) break
    if(sum>target) r--; else l++
  }
  return steps
}

// ─── #11  Container With Most Water ─────────────────────────────────────────
function steps11(height: number[]): VizStep[] {
  const n=height.length
  const steps: VizStep[] = []
  let maxArea=0
  steps.push(s(height, (()=>{const c=height.map(()=>N);c[0]=LP;c[n-1]=RP;return c})(),
    [ptr(0,'L'),ptr(n-1,'R')],`Heights. Find max water container.`,[['left',0],['right',n-1],['maxArea',0]],{phase:'Init'}))
  let l=0,r=n-1
  while(l<r){
    const area=(r-l)*Math.min(height[l],height[r])
    maxArea=Math.max(maxArea,area)
    const c: string[]=height.map((_,i)=>i>=l&&i<=r?WN:N)
    c[l]=LP;c[r]=RP
    const move=height[l]<height[r]?'L < R → L++':'R ≤ L → R--'
    steps.push(s(height,c,[ptr(l,'L'),ptr(r,'R')],
      `area=(${r}-${l})×min(${height[l]},${height[r]})=${area}. maxArea=${maxArea}. ${move}`,
      [['left',l],['right',r],['area',area],['maxArea',maxArea]],
      {phase:area===maxArea?'New Max':'Move'}))
    if(height[l]<height[r]) l++; else r--
  }
  steps.push(s(height,height.map(()=>DN),[],`Done.`,[['maxArea',maxArea]],{phase:'Done',result:`${maxArea}`}))
  return steps
}

// ─── #15  3Sum ───────────────────────────────────────────────────────────────
function steps15(nums: number[]): VizStep[] {
  const arr=[...nums].sort((a,b)=>a-b)
  const n=arr.length
  const steps: VizStep[] = []
  const found: number[][]=[]
  steps.push(s(arr,arr.map(()=>N),[],`Sorted → [${arr}]. Fix i, use L=i+1 and R=n-1.`,[],{phase:'Init'}))
  for(let i=0;i<n-2;i++){
    if(i>0&&arr[i]===arr[i-1]) continue
    let l=i+1,r=n-1
    while(l<r){
      const sum=arr[i]+arr[l]+arr[r]
      const c: string[]=arr.map(()=>DM);c[i]=FX;c[l]=LP;c[r]=RP
      const msg=sum===0?`${arr[i]}+${arr[l]}+${arr[r]}=0 ✓`
        :sum<0?`sum=${sum}<0 → L++`:`sum=${sum}>0 → R--`
      if(sum===0){found.push([arr[i],arr[l],arr[r]]);c[i]=OK;c[l]=OK;c[r]=OK}
      steps.push(s(arr,c,[ptr(i,'i'),ptr(l,'L'),ptr(r,'R')],msg,
        [['i',i],['L',l],['R',r],['sum',sum]],
        {phase:sum===0?'Found':'Move',result:sum===0?`[${arr[i]},${arr[l]},${arr[r]}]`:undefined}))
      if(sum===0){while(l<r&&arr[l]===arr[l+1])l++;while(l<r&&arr[r]===arr[r-1])r--;l++;r--}
      else if(sum<0) l++; else r--
    }
  }
  steps.push(s(arr,arr.map(()=>DN),[],`Done: ${found.length} triplets found.`,[],
    {phase:'Done',result:found.map(t=>`[${t}]`).join(', ')||'[]'}))
  return steps
}

// ─── #1  Two Sum (hash map) ──────────────────────────────────────────────────
function steps1(nums: number[], target: number): VizStep[] {
  const steps: VizStep[] = []
  const map: Record<number,number>={}
  steps.push(s(nums,nums.map(()=>N),[],`Hash map approach. For each num, check if complement exists.`,
    [['target',target],['map','{}']],{phase:'Init'}))
  for(let i=0;i<nums.length;i++){
    const complement=target-nums[i]
    const c: string[]=nums.map(()=>N);c[i]=MP
    if(map[complement]!==undefined){
      c[i]=OK;c[map[complement]]=OK
      steps.push(s(nums,c,[],`num=${nums[i]}, need ${complement} → found at [${map[complement]}]! ✓`,
        [['i',i],['num',nums[i]],['need',complement]],
        {phase:'Found',result:`[${map[complement]}, ${i}]`}))
      break
    }
    steps.push(s(nums,c,[],`num=${nums[i]}, need ${complement} → not found. Store ${nums[i]}:${i}.`,
      [['i',i],['num',nums[i]],['need',complement],['map',JSON.stringify(map)]],{phase:'Store'}))
    map[nums[i]]=i
  }
  return steps
}

// ─── #704  Binary Search ─────────────────────────────────────────────────────
function steps704(nums: number[], target: number): VizStep[] {
  const arr=[...nums].sort((a,b)=>a-b)
  const n=arr.length
  const steps: VizStep[] = []
  steps.push(s(arr,arr.map(()=>N),[ptr(0,'L'),ptr(n-1,'R')],
    `Sorted. target=${target}. L=0, R=${n-1}.`,
    [['left',0],['right',n-1],['target',target]],{phase:'Init'}))
  let l=0,r=n-1
  while(l<=r){
    const mid=Math.floor((l+r)/2)
    const c: string[]=arr.map((_,i)=>i>=l&&i<=r?N:DM);c[mid]=MP
    const msg=arr[mid]===target?`arr[${mid}]=${arr[mid]} == ${target} ✓`
      :arr[mid]<target?`arr[${mid}]=${arr[mid]} < ${target} → L=mid+1`
      :`arr[${mid}]=${arr[mid]} > ${target} → R=mid-1`
    if(arr[mid]===target) c[mid]=OK
    steps.push(s(arr,c,[ptr(l,'L'),ptr(mid,'M'),ptr(r,'R')],msg,
      [['left',l],['mid',mid],['right',r]],
      {phase:arr[mid]===target?'Found':'Halve',result:arr[mid]===target?`${mid}`:undefined}))
    if(arr[mid]===target) break
    if(arr[mid]<target) l=mid+1; else r=mid-1
  }
  if(steps[steps.length-1].result===undefined)
    steps.push(s(arr,arr.map(()=>DM),[],`Not found.`,[],{phase:'Done',result:'-1'}))
  return steps
}

// ─── #27  Remove Element ─────────────────────────────────────────────────────
function steps27(nums: number[], val: number): VizStep[] {
  const arr=[...nums]; const n=arr.length
  const steps: VizStep[] = []
  steps.push(s(arr,arr.map(()=>N),[ptr(0,'S'),ptr(0,'F')],
    `slow=fast=0. Write non-${val} elements to slow pointer.`,
    [['slow',0],['fast',0],['val',val]],{phase:'Init'}))
  let slow=0
  for(let fast=0;fast<n;fast++){
    const isVal=arr[fast]===val
    const c: string[]=arr.map(()=>N)
    for(let i=0;i<slow;i++) c[i]=DN
    c[fast]=isVal?NO:OK
    steps.push(s(arr,c,[ptr(slow,'S'),ptr(fast,'F')],
      isVal?`arr[${fast}]=${arr[fast]} == ${val} → skip`
           :`arr[${fast}]=${arr[fast]} ≠ ${val} → write to [${slow}], slow++`,
      [['slow',slow],['fast',fast]],{phase:isVal?'Skip':'Write'}))
    if(!isVal){arr[slow]=arr[fast];slow++}
  }
  steps.push(s(arr,arr.map((_,i)=>i<slow?DN:DM),[],`Done. k=${slow}.`,
    [['k',slow]],{phase:'Done',result:`k = ${slow}`}))
  return steps
}

// ─── #26  Remove Duplicates ──────────────────────────────────────────────────
function steps26(nums: number[]): VizStep[] {
  const arr=[...nums].sort((a,b)=>a-b); const n=arr.length
  const steps: VizStep[] = []
  steps.push(s(arr,arr.map(()=>N),[ptr(0,'S'),ptr(1,'F')],
    `slow=0. fast scans. When arr[fast] ≠ arr[slow], write unique.`,
    [['slow',0],['fast',1]],{phase:'Init'}))
  let slow=0
  for(let fast=1;fast<n;fast++){
    const dup=arr[fast]===arr[slow]
    const c: string[]=arr.map(()=>N)
    for(let i=0;i<=slow;i++) c[i]=DN
    c[fast]=dup?DM:OK
    steps.push(s(arr,c,[ptr(slow,'S'),ptr(fast,'F')],
      dup?`arr[${fast}]=${arr[fast]} duplicate → skip`
         :`arr[${fast}]=${arr[fast]} unique → write to [${slow+1}]`,
      [['slow',slow],['fast',fast]],{phase:dup?'Duplicate':'Write'}))
    if(!dup){slow++;arr[slow]=arr[fast]}
  }
  steps.push(s(arr,arr.map((_,i)=>i<=slow?DN:DM),[],`Done. k=${slow+1}.`,
    [['k',slow+1]],{phase:'Done',result:`k = ${slow+1}`}))
  return steps
}

// ─── #3  Sliding Window ──────────────────────────────────────────────────────
function steps3(str: string): VizStep[] {
  const chars=str.split(''); const n=chars.length
  const steps: VizStep[] = []
  const map=new Map<string,number>()
  let left=0,maxLen=0
  steps.push(s(chars,chars.map(()=>N),[],
    `Sliding window. Expand right; on duplicate jump left.`,
    [['left',0],['maxLen',0]],{phase:'Init'}))
  for(let right=0;right<n;right++){
    const ch=chars[right]
    if(map.has(ch)&&map.get(ch)!>=left){
      const prev=map.get(ch)!
      const c: string[]=chars.map((_,i)=>i>=left&&i<=right?WN:DM)
      c[prev]=NO;c[right]=NO
      steps.push(s(chars,c,[],
        `'${ch}' at [${prev}] is in window → jump left to ${prev+1}.`,
        [['left',left],['right',right],['dup',`'${ch}'`]],
        {phase:'Shrink',windowRange:[left,right]}))
      left=prev+1
    }
    map.set(ch,right)
    const len=right-left+1
    maxLen=Math.max(maxLen,len)
    const c: string[]=chars.map((_,i)=>i>=left&&i<=right?WN:DM);c[right]=OK
    steps.push(s(chars,c,[],
      `window="${str.slice(left,right+1)}", len=${len}. maxLen=${maxLen}.`,
      [['left',left],['right',right],['len',len],['maxLen',maxLen]],
      {phase:'Expand',windowRange:[left,right]}))
  }
  steps.push(s(chars,chars.map(()=>DN),[],`Done.`,[['maxLen',maxLen]],{phase:'Done',result:`${maxLen}`}))
  return steps
}

// ─── #509  Fibonacci ─────────────────────────────────────────────────────────
function steps509(n: number): VizStep[] {
  const dp: (number|string)[]=Array(n+1).fill('?')
  const labels=Array.from({length:n+1},(_,i)=>`F(${i})`)
  const steps: VizStep[] = []
  steps.push(s([...dp],dp.map(()=>N),[],`Build dp table. F(n)=F(n-1)+F(n-2).`,
    [['n',n]],{phase:'Init',secondCells:labels,secondCellColors:labels.map(()=>DM),secondLabel:'index'}))
  dp[0]=0;dp[1]=1
  steps.push(s([...dp],dp.map((_,i)=>i<=1?OK:N),[],`Base cases: F(0)=0, F(1)=1.`,
    [['F(0)',0],['F(1)',1]],{phase:'Base',secondCells:labels,secondCellColors:labels.map((_,i)=>i<=1?OK:DM),secondLabel:'index'}))
  for(let i=2;i<=n;i++){
    dp[i]=(dp[i-1] as number)+(dp[i-2] as number)
    steps.push(s([...dp],dp.map((_,j)=>j<i?DN:j===i?OK:N),[],
      `F(${i})=F(${i-1})+F(${i-2})=${dp[i-1]}+${dp[i-2]}=${dp[i]}`,
      [[`F(${i-1})`,dp[i-1] as number],[`F(${i-2})`,dp[i-2] as number],[`F(${i})`,dp[i] as number]],
      {phase:'Compute',secondCells:labels,secondCellColors:labels.map((_,j)=>j<i?DN:j===i?OK:DM),secondLabel:'index'}))
  }
  steps.push(s([...dp],dp.map(()=>DN),[],`Done.`,[[`F(${n})`,dp[n] as number]],
    {phase:'Done',result:`F(${n}) = ${dp[n]}`}))
  return steps
}

// ─── #70  Climbing Stairs ────────────────────────────────────────────────────
function steps70(n: number): VizStep[] {
  const dp: (number|string)[]=Array(n+1).fill('?')
  const labels=Array.from({length:n+1},(_,i)=>`dp[${i}]`)
  const steps: VizStep[] = []
  steps.push(s([...dp],dp.map(()=>N),[],`ways(n)=ways(n-1)+ways(n-2). Same recurrence as Fibonacci.`,
    [['n',n]],{phase:'Init',secondCells:labels,secondCellColors:labels.map(()=>DM),secondLabel:'stairs'}))
  dp[0]=1;dp[1]=1
  steps.push(s([...dp],dp.map((_,i)=>i<=1?OK:N),[],`Base: 1 way for 0 stairs, 1 way for 1 stair.`,
    [['dp[0]',1],['dp[1]',1]],{phase:'Base',secondCells:labels,secondCellColors:labels.map((_,i)=>i<=1?OK:DM),secondLabel:'stairs'}))
  for(let i=2;i<=n;i++){
    dp[i]=(dp[i-1] as number)+(dp[i-2] as number)
    steps.push(s([...dp],dp.map((_,j)=>j<i?DN:j===i?OK:N),[],
      `dp[${i}]=dp[${i-1}]+dp[${i-2}]=${dp[i-1]}+${dp[i-2]}=${dp[i]} ways`,
      [[`dp[${i-1}]`,dp[i-1] as number],[`dp[${i-2}]`,dp[i-2] as number],[`dp[${i}]`,dp[i] as number]],
      {phase:'Compute',secondCells:labels,secondCellColors:labels.map((_,j)=>j<i?DN:j===i?OK:DM),secondLabel:'stairs'}))
  }
  steps.push(s([...dp],dp.map(()=>DN),[],`Done.`,[[`dp[${n}]`,dp[n] as number]],
    {phase:'Done',result:`${dp[n]} ways to climb ${n} stairs`}))
  return steps
}

// ─── #303  Prefix Sum ────────────────────────────────────────────────────────
function steps303(nums: number[], ql: number, qr: number): VizStep[] {
  const n=nums.length
  const prefix: (number|string)[]=Array(n+1).fill('?')
  const steps: VizStep[] = []
  steps.push(s(nums,nums.map(()=>N),[],
    `Build prefix[]. prefix[i]=sum of nums[0..i-1]. Query sumRange(${ql},${qr}).`,
    [],[{phase:'Init',secondCells:[...prefix],secondCellColors:prefix.map(()=>DM),secondLabel:'prefix[]'}][0] as never))
  // workaround for opts
  const initStep=steps[0]; initStep.secondCells=[...prefix]; initStep.secondCellColors=prefix.map(()=>DM); initStep.secondLabel='prefix[]'
  prefix[0]=0
  for(let i=1;i<=n;i++){
    prefix[i]=(prefix[i-1] as number)+nums[i-1]
    const nc: string[]=nums.map((_,j)=>j<i-1?DN:j===i-1?HL:N)
    const pc=prefix.map((_,j)=>j<i?DN:j===i?OK:DM)
    steps.push(s(nums,nc,[],
      `prefix[${i}]=prefix[${i-1}]+nums[${i-1}]=${prefix[i-1]}+${nums[i-1]}=${prefix[i]}`,
      [[`prefix[${i}]`,prefix[i] as number]],
      {phase:'Build',secondCells:[...prefix],secondCellColors:pc,secondLabel:'prefix[]'}))
  }
  const qAns=(prefix[qr+1] as number)-(prefix[ql] as number)
  const qc=nums.map((_,i)=>i>=ql&&i<=qr?WN:DM)
  const pc2=prefix.map((_,i)=>i===ql||i===qr+1?OK:DN)
  steps.push(s(nums,qc,[],
    `sumRange(${ql},${qr})=prefix[${qr+1}]−prefix[${ql}]=${prefix[qr+1]}−${prefix[ql]}=${qAns}`,
    [[`prefix[${qr+1}]`,prefix[qr+1] as number],[`prefix[${ql}]`,prefix[ql] as number],['answer',qAns]],
    {phase:'Query',result:`sumRange(${ql},${qr}) = ${qAns}`,windowRange:[ql,qr],
     secondCells:[...prefix],secondCellColors:pc2,secondLabel:'prefix[]'}))
  return steps
}

// ─── Schema definitions ───────────────────────────────────────────────────────
const F = (key: string, label: string, type: VizInputField['type'], placeholder: string, def: string): VizInputField =>
  ({ key, label, type, placeholder, defaultValue: def })

const schemas: Record<number, VizInputField[]> = {
  125: [F('s','String','string','e.g. racecar','racecar')],
  167: [F('nums','Array','number[]','e.g. 2,7,11,15','2,7,11,15'), F('target','Target','number','e.g. 9','9')],
  11:  [F('height','Heights','number[]','e.g. 1,8,6,2,5','1,8,6,2,5')],
  15:  [F('nums','Array','number[]','e.g. -1,0,1,2,-1,-4','-4,-1,-1,0,1,2')],
  1:   [F('nums','Array','number[]','e.g. 2,7,11,15','2,7,11,15'), F('target','Target','number','e.g. 9','9')],
  704: [F('nums','Array','number[]','sorted, e.g. -1,0,3,5,9,12','-1,0,3,5,9,12'), F('target','Target','number','e.g. 9','9')],
  27:  [F('nums','Array','number[]','e.g. 3,2,2,3','3,2,2,3'), F('val','Val','number','e.g. 3','3')],
  26:  [F('nums','Array','number[]','sorted, e.g. 1,1,2','1,1,2')],
  3:   [F('s','String','string','e.g. abcabcbb','abcb')],
  509: [F('n','n','number','1–15','7')],
  70:  [F('n','n','number','1–12','6')],
  303: [F('nums','Array','number[]','e.g. -2,0,3,-5,2','-2,0,3,-5,2'), F('l','Left','number','0','0'), F('r','Right','number','2','2')],
}

// ─── Config builders ──────────────────────────────────────────────────────────
type Inputs = Record<string, string>

function buildConfig(
  problemId: number, title: string,
  buildSteps: (vals: Inputs) => VizStep[],
  defaultDemoInput: (schema: VizInputField[]) => string,
  inputs?: Inputs
): VizConfig {
  const schema = schemas[problemId] ?? []
  const vals: Inputs = {}
  schema.forEach(f => { vals[f.key] = inputs?.[f.key] ?? f.defaultValue })
  const steps = buildSteps(vals)
  const demoInput = defaultDemoInput(schema).replace(
    /\{(\w+)\}/g, (_,k) => vals[k] ?? ''
  )
  return { title, demoInput, steps, inputSchema: schema }
}

const generators: Record<number, (inputs?: Inputs) => VizConfig> = {
  125: (i) => {
    const schema=schemas[125]!
    const vals={s:i?.s??schema[0].defaultValue}
    return {title:'Valid Palindrome',demoInput:`s = "${vals.s}"`,inputSchema:schema,
      steps:steps125(vals.s)}
  },
  167: (i) => {
    const schema=schemas[167]!
    try {
      const nums=parseArr(i?.nums??schema[0].defaultValue)
      const target=parseNum(i?.target??schema[1].defaultValue)
      return {title:'Two Sum II',demoInput:`nums=[${nums}], target=${target}`,inputSchema:schema,
        steps:steps167(nums,target)}
    } catch(e) { throw e }
  },
  11: (i) => {
    const schema=schemas[11]!
    const height=parseArr(i?.height??schema[0].defaultValue,8)
    return {title:'Container With Most Water',demoInput:`height=[${height}]`,inputSchema:schema,
      steps:steps11(height)}
  },
  15: (i) => {
    const schema=schemas[15]!
    const nums=parseArr(i?.nums??schema[0].defaultValue,8)
    return {title:'3Sum',demoInput:`nums=[${nums}]`,inputSchema:schema,steps:steps15(nums)}
  },
  1: (i) => {
    const schema=schemas[1]!
    const nums=parseArr(i?.nums??schema[0].defaultValue)
    const target=parseNum(i?.target??schema[1].defaultValue)
    return {title:'Two Sum (Hash Map)',demoInput:`nums=[${nums}], target=${target}`,inputSchema:schema,
      steps:steps1(nums,target)}
  },
  704: (i) => {
    const schema=schemas[704]!
    const nums=parseArr(i?.nums??schema[0].defaultValue)
    const target=parseNum(i?.target??schema[1].defaultValue)
    return {title:'Binary Search',demoInput:`nums=[${nums}], target=${target}`,inputSchema:schema,
      steps:steps704(nums,target)}
  },
  27: (i) => {
    const schema=schemas[27]!
    const nums=parseArr(i?.nums??schema[0].defaultValue)
    const val=parseNum(i?.val??schema[1].defaultValue)
    return {title:'Remove Element',demoInput:`nums=[${nums}], val=${val}`,inputSchema:schema,
      steps:steps27(nums,val)}
  },
  26: (i) => {
    const schema=schemas[26]!
    const nums=parseArr(i?.nums??schema[0].defaultValue)
    return {title:'Remove Duplicates',demoInput:`nums=[${nums}]`,inputSchema:schema,steps:steps26(nums)}
  },
  3: (i) => {
    const schema=schemas[3]!
    const str=parseStr(i?.s??schema[0].defaultValue,15)
    return {title:'Sliding Window',demoInput:`s = "${str}"`,inputSchema:schema,steps:steps3(str)}
  },
  509: (i) => {
    const schema=schemas[509]!
    const n=Math.min(15,Math.max(2,Math.round(parseNum(i?.n??schema[0].defaultValue,2,15))))
    return {title:'Fibonacci DP',demoInput:`n = ${n}`,inputSchema:schema,steps:steps509(n)}
  },
  70: (i) => {
    const schema=schemas[70]!
    const n=Math.min(12,Math.max(2,Math.round(parseNum(i?.n??schema[0].defaultValue,2,12))))
    return {title:'Climbing Stairs DP',demoInput:`n = ${n}`,inputSchema:schema,steps:steps70(n)}
  },
  303: (i) => {
    const schema=schemas[303]!
    const nums=parseArr(i?.nums??schema[0].defaultValue,8)
    const l=Math.max(0,Math.min(nums.length-2,Math.round(parseNum(i?.l??schema[1].defaultValue,0,nums.length-1))))
    const r=Math.max(l,Math.min(nums.length-1,Math.round(parseNum(i?.r??schema[2].defaultValue,0,nums.length-1))))
    return {title:'Prefix Sum',demoInput:`nums=[${nums}], sumRange(${l},${r})`,inputSchema:schema,
      steps:steps303(nums,l,r)}
  },
}

void buildConfig  // suppress unused warning

export function getVizConfig(problemId: number, inputs?: Inputs): VizConfig | null {
  const gen = generators[problemId]
  if (!gen) return null
  return gen(inputs)
}

export const vizProblemIds = new Set(Object.keys(generators).map(Number))
