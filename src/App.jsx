import { useMemo, useState } from 'react'
import logo from './assets/logo el-nilein.jpeg'
import './App.css'

const demoPassword = 'Nilein@2026'

const accounts = [
  { id: 'admin', email: 'admin@nilein.demo', password: demoPassword, name: 'Mohamed Abdullah', role: 'System Administrator', department: 'Administration', line: null },
  { id: 'manager', email: 'manager@nilein.demo', password: demoPassword, name: 'Nadia Osman', role: 'Production Manager', department: 'Production', line: null },
  { id: 'cars', email: 'cars@nilein.demo', password: demoPassword, name: 'Ahmed Hassan', role: 'Motor Insurance Officer', department: 'Motor Insurance', line: 'Motor Insurance' },
  { id: 'agriculture', email: 'farm@nilein.demo', password: demoPassword, name: 'Sara Ibrahim', role: 'Agricultural Insurance Officer', department: 'Agricultural Insurance', line: 'Agricultural Insurance' },
  { id: 'livestock', email: 'animals@nilein.demo', password: demoPassword, name: 'Omar Khaled', role: 'Livestock Insurance Officer', department: 'Livestock Insurance', line: 'Livestock Insurance' },
]

const dashboardData = {
  admin: {
    policies: '2,486',
    premium: '1,284,500',
    claims: '38',
    clients: '1,892',
    clientLabel: 'Registered Clients',
    heroTitle: 'Your insurance operations,',
    heroSubtitle: 'all in one clear view.',
    heroDescription: 'A unified view of Nilein branches and insurance services.',
  },
  manager: {
    policies: '2,486',
    premium: '1,284,500',
    claims: '38',
    clients: '1,892',
    clientLabel: 'Registered Clients',
    heroTitle: 'Production at',
    heroSubtitle: 'the center of every policy.',
    heroDescription: 'Review approved insurance entries and issue policy documents.',
  },
  cars: {
    policies: '1,042',
    premium: '648,200',
    claims: '16',
    clients: '784',
    clientLabel: 'Motor Insurance Clients',
    heroTitle: 'Protection on the road,',
    heroSubtitle: 'with faster service for every client.',
    heroDescription: 'A dedicated workspace for motor insurance clients and policies.',
  },
  agriculture: {
    policies: '426',
    premium: '286,400',
    claims: '9',
    clients: '318',
    clientLabel: 'Agricultural Insurance Clients',
    heroTitle: 'Protecting your land,',
    heroSubtitle: 'supporting your growth.',
    heroDescription: 'A dedicated workspace for agricultural insurance clients and policies.',
  },
  livestock: {
    policies: '284',
    premium: '198,750',
    claims: '7',
    clients: '226',
    clientLabel: 'Livestock Insurance Clients',
    heroTitle: 'Care for your livestock,',
    heroSubtitle: 'security for your livelihood.',
    heroDescription: 'A dedicated workspace for livestock insurance clients and policies.',
  },
}

const navigation = [
  { label: 'Dashboard', icon: 'home', audience: 'all' },
  { label: 'Clients', icon: 'users', audience: 'all' },
  { label: 'Insurance Policies', icon: 'file', audience: 'all' },
  { label: 'Production (Insurance)', icon: 'shield', audience: 'cars' },
  { label: 'Collections', icon: 'wallet', audience: 'all' },
  { label: 'Reports', icon: 'chart', audience: 'admin' },
  { label: 'Employees & Access', icon: 'settings', audience: 'admin' },
  { label: 'Entry Approval', icon: 'file', audience: 'admin' },
  { label: 'Production Entry Approval', icon: 'shield', audience: 'manager' },
]

const initialPolicies = [
  { id: 'NI-2025-0842', client: 'Horizon Transport Co.', type: 'Motor Insurance', date: 'Feb 12, 2025', amount: '24,500', status: 'Active', color: 'blue' },
  { id: 'NI-2025-0841', client: 'Nile Valley Foundation', type: 'Agricultural Insurance', date: 'Feb 11, 2025', amount: '18,200', status: 'Under Review', color: 'amber' },
  { id: 'NI-2025-0840', client: 'Ahmed Mohamed Ali', type: 'Health Insurance', date: 'Feb 10, 2025', amount: '6,800', status: 'Active', color: 'blue' },
  { id: 'NI-2025-0839', client: 'Good Harvest Farms', type: 'Livestock Insurance', date: 'Feb 9, 2025', amount: '32,000', status: 'Completed', color: 'green' },
  { id: 'NI-2025-0838', client: 'Al Namaa Agriculture', type: 'Agricultural Insurance', date: 'Feb 8, 2025', amount: '21,600', status: 'Active', color: 'blue' },
  { id: 'NI-2025-0837', client: 'Modern Route Co.', type: 'Motor Insurance', date: 'Feb 7, 2025', amount: '27,400', status: 'Active', color: 'blue' },
  { id: 'NI-2025-0836', client: 'Valley Farms', type: 'Livestock Insurance', date: 'Feb 6, 2025', amount: '14,300', status: 'Under Review', color: 'amber' },
]

function Icon({ name, size = 20 }) {
  const paths = {
    home: <><path d="m3 10 9-7 9 7" /><path d="M5 9v11h14V9M9 20v-6h6v6" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="10" cy="7" r="4" /><path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
    file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M8 13h8M8 17h8" /></>,
    wallet: <><rect x="3" y="5" width="18" height="15" rx="2" /><path d="M3 9h18M16 15h.01" /><path d="M7 5V3h11" /></>,
    chart: <><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-5 5" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.7a8 8 0 0 1-1.7 1l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.7-1l-1.7.7-1.4-2.4L7.3 15a8 8 0 0 1 0-2l-1.4-1.1 1.4-2.4 1.7.7a8 8 0 0 1 1.7-1L11 7.4h2.8l.3 1.8a8 8 0 0 1 1.7 1l1.7-.7 1.4 2.4-1.4 1.1a8 8 0 0 1-.1 2Z" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
    chevron: <path d="m7 10 5 5 5-5" />,
    arrow: <><path d="M7 17 17 7M7 7h10v10" /></>,
    dots: <><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 11h18" /></>,
    car: <><path d="m5 11 1.5-5h11l1.5 5M3 11h18v7H3z" /><path d="M6 18v2M18 18v2M6 14h.01M18 14h.01" /></>,
    shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11" /><path d="m9 12 2 2 4-4" /></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
    close: <><path d="m18 6-12 12M6 6l12 12" /></>,
    logout: <><path d="M10 17l5-5-5-5M15 12H3" /><path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" /></>,
    lock: <><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 1 1 8 0v3" /></>,
    eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></>,
    leaf: <><path d="M20 4c-9 0-15 4-15 11a5 5 0 0 0 5 5c7 0 11-7 10-16Z" /><path d="M5 20c2-5 6-8 11-11" /></>,
  }

  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  )
}

function BrandMark({ className = '' }) {
  return <img className={`brand-image ${className}`} src={logo} alt="El Nilein Insurance" />
}

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function submitLogin(event) {
    event.preventDefault()
    const account = accounts.find((item) => item.email.toLowerCase() === email.trim().toLowerCase() && item.password === password)
    if (!account) {
      setError('Email or password is incorrect. Please use one of the demo accounts.')
      return
    }
    setError('')
    onLogin(account)
  }

  return (
    <main className="login-page" dir="ltr">
      <div className="login-decoration login-decoration-one" />
      <div className="login-decoration login-decoration-two" />
      <section className="login-layout">
        <div className="login-panel">
          <div className="login-brand"><BrandMark /><span>Insurance Management System</span></div>
          <div className="login-heading">
            <span className="login-eyebrow"><i /> Employee Portal</span>
            <h1>Welcome back</h1>
            <p>Sign in to your account to securely manage your work.</p>
          </div>
          <form className="login-form" onSubmit={submitLogin}>
            <label htmlFor="login-email">Email address</label>
            <div className="login-input-wrap"><Icon name="users" size={18} /><input id="login-email" type="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@nilein.demo" /></div>
            <label htmlFor="login-password">Password</label>
            <div className="login-input-wrap"><Icon name="lock" size={18} /><input id="login-password" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" /></div>
            {error && <p className="login-error" role="alert">{error}</p>}
            <button type="submit" className="button-primary login-submit">Sign in <span>→</span></button>
          </form>
          <div className="login-security"><Icon name="shield" size={16} /><span>Secure access tailored to your role</span></div>
        </div>

        <aside className="demo-panel">
          <div className="demo-panel-heading"><span className="demo-kicker">DEMO ENVIRONMENT</span><h2>Explore the system<br />from every role</h2><p>Choose a demo account to open its dedicated workspace.</p></div>
          <div className="demo-account-list">
            {accounts.map((account) => (
              <button type="button" className="demo-account" key={account.id} onClick={() => onLogin(account)}>
                <span className={`demo-account-icon ${account.id}`}><Icon name={account.id === 'cars' ? 'car' : account.id === 'agriculture' ? 'leaf' : account.id === 'livestock' ? 'heart' : 'settings'} size={19} /></span>
                <span className="demo-account-info"><strong>{account.role}</strong><small>{account.email}</small></span>
                <span className="demo-account-arrow">→</span>
              </button>
            ))}
          </div>
          <p className="demo-password"><Icon name="lock" size={14} /> Shared password: <strong>{demoPassword}</strong></p>
          <div className="demo-disclaimer">Demo accounts only — no live server or customer data is connected.</div>
        </aside>
      </section>
      <footer className="login-footer">© 2025 El Nilein Insurance. All rights reserved.</footer>
    </main>
  )
}

function emptyClient() {
  return {
    kind: 'individual',
    nameArabic: '',
    nameEnglish: '',
    mobile: '',
    telephone: '',
    fax: '',
    email: '',
    website: '',
    crNumber: '',
    companyRegister: '',
    isRepresentative: false,
    contacts: [],
  }
}

function ClientForm({ initialClient, onCancel, onSave }) {
  const [form, setForm] = useState(() => initialClient ? { ...initialClient, contacts: initialClient.contacts.map((contact) => ({ ...contact })) } : emptyClient())

  function updateField(event) {
    const { name, value, type, checked } = event.target
    setForm((current) => {
      const updatedForm = { ...current, [name]: type === 'checkbox' ? checked : value }
      if (name === 'isRepresentative' && checked && current.contacts.length === 0) {
        updatedForm.contacts = [{ name: '', title: '', mobile: '', email: '' }]
      }
      return updatedForm
    })
  }

  function updateContact(index, event) {
    const { name, value } = event.target
    setForm((current) => ({
      ...current,
      contacts: current.contacts.map((contact, contactIndex) => contactIndex === index ? { ...contact, [name]: value } : contact),
    }))
  }

  function addContact() {
    setForm((current) => ({ ...current, contacts: [...current.contacts, { name: '', title: '', mobile: '', email: '' }] }))
  }

  function removeContact(index) {
    setForm((current) => ({ ...current, contacts: current.contacts.filter((_, contactIndex) => contactIndex !== index) }))
  }

  function submit(event) {
    event.preventDefault()
    onSave({
      ...form,
      isRepresentative: form.kind === 'company' && form.isRepresentative,
      contacts: form.kind === 'company' && form.isRepresentative
        ? form.contacts.filter((contact) => Object.values(contact).some((value) => value.trim()))
        : [],
    })
  }

  return (
    <form className="client-form" onSubmit={submit}>
      <div className="client-form-heading"><div><span className="eyebrow"><span className="eyebrow-line" /> CLIENT PROFILE</span><h2>{initialClient ? 'Edit Client Details' : 'Register a New Client'}</h2><p>Enter the client’s details and contact information.</p></div><button type="button" className="button-secondary" onClick={onCancel}>Cancel</button></div>
      <section className="form-section">
        <div className="form-section-title"><span className="form-step">1</span><div><h3>Client Type</h3><p>Choose whether you are registering an individual or a company.</p></div></div>
        <div className="choice-row">
          <label className={`choice-card ${form.kind === 'individual' ? 'selected' : ''}`}><input type="radio" name="kind" value="individual" checked={form.kind === 'individual'} onChange={updateField} /><span><strong>Individual</strong><small>Register an individual client</small></span></label>
          <label className={`choice-card ${form.kind === 'company' ? 'selected' : ''}`}><input type="radio" name="kind" value="company" checked={form.kind === 'company'} onChange={updateField} /><span><strong>Company</strong><small>Register a company or organization</small></span></label>
        </div>
      </section>

      <section className="form-section">
        <div className="form-section-title"><span className="form-step">2</span><div><h3>{form.kind === 'company' ? 'Company Details' : 'Personal Details'}</h3><p>Names, contact information, and communication details.</p></div></div>
        <div className="client-fields">
          <label className="field-control"><span>{form.kind === 'company' ? 'Company Name (Arabic)' : 'Full Name (Arabic)'} <i>*</i></span><input name="nameArabic" required value={form.nameArabic} onChange={updateField} placeholder="Enter the Arabic name" /></label>
          <label className="field-control"><span>{form.kind === 'company' ? 'Company Name (English)' : 'Full Name (English)'} <i>*</i></span><input name="nameEnglish" required dir="auto" value={form.nameEnglish} onChange={updateField} placeholder="Enter the English name" /></label>
          <label className="field-control"><span>Mobile Number <i>*</i></span><input name="mobile" type="tel" required value={form.mobile} onChange={updateField} placeholder="+249 ..." /></label>
          <label className="field-control"><span>Telephone</span><input name="telephone" type="tel" value={form.telephone} onChange={updateField} placeholder="Telephone number" /></label>
          <label className="field-control"><span>Fax</span><input name="fax" type="tel" value={form.fax} onChange={updateField} placeholder="Fax number" /></label>
          <label className="field-control"><span>Email Address</span><input name="email" type="email" dir="ltr" value={form.email} onChange={updateField} placeholder="name@company.com" /></label>
          <label className="field-control"><span>Website</span><input name="website" dir="ltr" value={form.website} onChange={updateField} placeholder="www.company.com" /></label>
          {form.kind === 'company' && <><label className="field-control"><span>Commercial Registration No. (CR No.)</span><input name="crNumber" value={form.crNumber} onChange={updateField} placeholder="Registration number" /></label><label className="field-control"><span>Company Registration Details</span><input name="companyRegister" value={form.companyRegister} onChange={updateField} placeholder="Registration authority or location" /></label></>}
        </div>
      </section>

      {form.kind === 'company' && <section className="form-section">
        <div className="form-section-title"><span className="form-step">3</span><div><h3>Contact List</h3><p>Add the representatives who are authorized to contact us on behalf of the company.</p></div></div>
        <label className="representative-toggle"><input type="checkbox" name="isRepresentative" checked={form.isRepresentative} onChange={updateField} /><span><strong>Registering on behalf of the company</strong><small>Show the company’s contact list.</small></span></label>
        {form.isRepresentative && <div className="contacts-list">{form.contacts.map((contact, index) => <div className="contact-card" key={`contact-${index}`}><div className="contact-card-heading"><strong>Contact {index + 1}</strong><button type="button" className="remove-contact" onClick={() => removeContact(index)}>Remove</button></div><div className="client-fields"><label className="field-control"><span>Representative Name</span><input name="name" value={contact.name} onChange={(event) => updateContact(index, event)} placeholder="Contact name" /></label><label className="field-control"><span>Job Title</span><input name="title" value={contact.title} onChange={(event) => updateContact(index, event)} placeholder="Job title" /></label><label className="field-control"><span>Mobile Number</span><input name="mobile" type="tel" value={contact.mobile} onChange={(event) => updateContact(index, event)} placeholder="Mobile number" /></label><label className="field-control"><span>Email Address</span><input name="email" type="email" dir="ltr" value={contact.email} onChange={(event) => updateContact(index, event)} placeholder="name@company.com" /></label></div></div>)}<button type="button" className="add-contact-button" onClick={addContact}><Icon name="plus" size={16} /> Add Contact</button></div>}
      </section>}

      <div className="client-form-actions"><button type="button" className="button-secondary" onClick={onCancel}>Cancel</button><button type="submit" className="button-primary"><Icon name="file" size={17} /> {initialClient ? 'Save Changes' : 'Save & Register Client'}</button></div>
    </form>
  )
}

function ClientProfile({ client, onEdit, onBack, onCreatePolicy }) {
  const fields = [
    ['Name (Arabic)', client.nameArabic],
    ['Name (English)', client.nameEnglish],
    ['Client Type', client.kind === 'company' ? 'Company' : 'Individual'],
    ['Mobile Number', client.mobile],
    ['Telephone', client.telephone],
    ['Fax', client.fax],
    ['Email Address', client.email],
    ['Website', client.website],
    ...(client.kind === 'company' ? [['Commercial Registration No. (CR No.)', client.crNumber], ['Company Registration Details', client.companyRegister]] : []),
  ]

  return (
    <section className="client-profile-page">
      <div className="client-form-heading"><div><span className="eyebrow"><span className="eyebrow-line" /> CLIENT PROFILE</span><h2>{client.nameEnglish || client.nameArabic}</h2><p>Client ID: <strong className="client-id">{client.id}</strong></p></div><div className="profile-actions"><button type="button" className="button-secondary" onClick={onBack}>All Clients</button><button type="button" className="button-secondary" onClick={onEdit}>Edit Details</button><button type="button" className="button-primary" onClick={onCreatePolicy}>Create Policy for Client</button></div></div>
      <div className="client-detail-card"><div className="detail-card-title"><span className="client-avatar large"><Icon name={client.kind === 'company' ? 'settings' : 'users'} size={21} /></span><div><strong>{client.nameEnglish || client.nameArabic}</strong><span>{client.nameArabic}</span></div><span className="client-kind-badge">{client.kind === 'company' ? 'Company' : 'Individual'}</span></div><div className="client-details-grid">{fields.map(([label, value]) => <div className="client-detail" key={label}><span>{label}</span><strong dir={label.includes('English') || label.includes('Email') || label.includes('Website') ? 'ltr' : undefined}>{value || '—'}</strong></div>)}</div></div>
      {client.kind === 'company' && client.isRepresentative && <div className="client-detail-card contacts-profile"><div className="profile-section-heading"><div><h3>Contact List</h3><p>Representatives authorized to contact us on behalf of the company.</p></div><span className="contact-count">{client.contacts.length}</span></div>{client.contacts.length ? <div className="contacts-profile-list">{client.contacts.map((contact, index) => <article className="contact-profile-card" key={`saved-contact-${index}`}><strong>{contact.name || `Contact ${index + 1}`}</strong><span>{contact.title || '—'}</span><span>{contact.mobile || '—'}</span><span dir="ltr">{contact.email || '—'}</span></article>)}</div> : <p className="no-contacts">No contacts have been added.</p>}</div>}
    </section>
  )
}

function ClientRegistry({ clients, onCreate, onUpdate, onStartPolicy }) {
  const [search, setSearch] = useState('')
  const [mode, setMode] = useState('list')
  const [selectedId, setSelectedId] = useState('')
  const [editingClient, setEditingClient] = useState(null)
  const selectedClient = clients.find((client) => client.id === selectedId)
  const filteredClients = clients.filter((client) => `${client.id} ${client.nameArabic} ${client.nameEnglish} ${client.mobile} ${client.telephone} ${client.email} ${client.crNumber} ${client.companyRegister}`.toLowerCase().includes(search.trim().toLowerCase()))

  function saveClient(data) {
    if (editingClient) {
      onUpdate(editingClient.id, data)
      setSelectedId(editingClient.id)
      setEditingClient(null)
      setMode('profile')
      return
    }

    const savedClient = onCreate(data)
    if (savedClient) {
      setSelectedId(savedClient.id)
      setMode('profile')
    }
  }

  if (mode === 'new' || mode === 'edit') {
    return <ClientForm initialClient={editingClient} onCancel={() => { setEditingClient(null); setMode(selectedId ? 'profile' : 'list') }} onSave={saveClient} />
  }

  if (mode === 'profile' && selectedClient) {
    return <ClientProfile client={selectedClient} onBack={() => setMode('list')} onEdit={() => { setEditingClient(selectedClient); setMode('edit') }} onCreatePolicy={() => onStartPolicy(selectedClient.id)} />
  }

  return (
    <section className="registry-page">
      <div className="registry-heading"><div><span className="eyebrow"><span className="eyebrow-line" /> PRODUCTION (INSURANCE)</span><h2>Client Registry</h2><p>Register clients and manage their profiles and contact information.</p></div><div className="registry-actions"><button className="button-secondary" type="button" onClick={() => onStartPolicy('')}><Icon name="file" size={17} /> Make New</button><button className="button-primary" type="button" onClick={() => setMode('new')}><Icon name="plus" size={18} /> Register New Client</button></div></div>
      <div className="registry-toolbar"><label className="registry-search"><Icon name="search" size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by name, client ID, phone, or CR number..." aria-label="Search client registry" /></label><span className="registry-count">Total Clients <strong>{clients.length}</strong></span></div>
      <div className="registry-table-wrap"><table className="registry-table"><thead><tr><th>Client ID</th><th>Name (Arabic)</th><th>Name (English)</th><th>Type</th><th>Mobile Number</th><th>Email Address</th><th /></tr></thead><tbody>
        {filteredClients.map((client) => <tr key={client.id}><td className="policy-id">{client.id}</td><td>{client.nameArabic}</td><td><button className="client-name-link" type="button" onClick={() => { setSelectedId(client.id); setMode('profile') }}>{client.nameEnglish}</button></td><td><span className="client-kind-badge">{client.kind === 'company' ? 'Company' : 'Individual'}</span></td><td dir="ltr">{client.mobile}</td><td dir="ltr">{client.email || '—'}</td><td><button type="button" className="row-more" aria-label={`View ${client.nameEnglish || client.id}`} onClick={() => { setSelectedId(client.id); setMode('profile') }}><Icon name="arrow" size={16} /></button></td></tr>)}
        {!filteredClients.length && <tr><td className="empty-state" colSpan="7">{clients.length ? 'No matching results found.' : 'No clients registered yet. Add your first client to get started.'}</td></tr>}
      </tbody></table></div>
      <p className="registry-footnote">Open a client profile to review or edit details and start a new policy.</p>
    </section>
  )
}

function MakeNewPolicy({ clients, onOpenRegistry, initialClientId, onSubmit }) {
  const [clientId, setClientId] = useState(initialClientId || '')
  const [lookupError, setLookupError] = useState('')
  const [selectedClient, setSelectedClient] = useState(null)
  const [activeTab, setActiveTab] = useState('policy')
  const [technicalTab, setTechnicalTab] = useState('covers')
  const [similarCars, setSimilarCars] = useState(null)
  const [draftMessage, setDraftMessage] = useState('')
  const today = new Date().toISOString().slice(0, 10)
  const expiry = new Date()
  expiry.setFullYear(expiry.getFullYear() + 1)
  const [policy, setPolicy] = useState(() => ({
    policyNo: `NLM-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`,
    branch: 'Khartoum',
    classOfInsurance: 'Motor Comprehensive',
    lineOfBusiness: 'Private Motor',
    issueDate: today,
    inceptionDate: today,
    expiryDate: expiry.toISOString().slice(0, 10),
    chassisNo: '',
    engineNo: '',
    plateNo: '',
    interestOf: '',
    make: '',
    model: '',
    year: '',
    vehicleUse: 'Private',
    minimumDriverAge: '21',
    annualDepreciation: '10',
    excess: '0',
    vehicleValue: '',
    premiumRate: '',
    discount: '0',
    loading: '0',
    stampDuty: '0',
    otherFees: '0',
    taxRate: '0',
    commissionRate: '0',
    downPayment: '0',
    installments: '1',
    dueDate: today,
    paymentMethod: 'Cash',
    paymentStatus: 'Unpaid',
    notes: '',
  }))
  const [selectedCovers, setSelectedCovers] = useState(['Accidental Damage', 'Third-Party Liability'])
  const [selectedTerms, setSelectedTerms] = useState(['Geographical Limits', 'Authorized Driver'])

  const similarCarRecords = [
    { chassisNo: 'JTFHT02P7X0123456', engineNo: '2KD-7654321', plateNo: 'خ ر ب 12345', make: 'Toyota', model: 'Hilux', year: '2022', vehicleUse: 'Private' },
    { chassisNo: 'JTFHT02P7X0654321', engineNo: '2KD-1234567', plateNo: 'خ ر ب 67890', make: 'Toyota', model: 'Hilux', year: '2021', vehicleUse: 'Commercial' },
    { chassisNo: 'WDB9066331S123456', engineNo: 'OM651-987654', plateNo: 'أ م د 24680', make: 'Mercedes-Benz', model: 'Sprinter', year: '2020', vehicleUse: 'Commercial' },
  ]

  function updatePolicy(event) {
    const { name, value } = event.target
    setPolicy((current) => ({ ...current, [name]: value }))
    setDraftMessage('')
  }

  function toggleSelection(setSelection, selection, value) {
    setSelection(selection.includes(value) ? selection.filter((item) => item !== value) : [...selection, value])
  }

  function refreshSimilarCars() {
    const identifiers = ['chassisNo', 'engineNo', 'plateNo'].filter((key) => policy[key].trim())
    setSimilarCars(identifiers.length
      ? similarCarRecords.filter((car) => identifiers.some((key) => car[key].toLowerCase() === policy[key].trim().toLowerCase()))
      : [])
  }

  function saveDraft() {
    const draft = { ...policy, clientId: selectedClient?.id, clientName: selectedClient?.nameEnglish, selectedCovers, selectedTerms, savedAt: new Date().toISOString() }
    try {
      localStorage.setItem(`nilein-demo-policy-${policy.policyNo}`, JSON.stringify(draft))
      setDraftMessage(`Draft ${policy.policyNo} saved in this browser.`)
    } catch (error) {
      console.error('Unable to save the demo policy draft.', error)
      setDraftMessage('Unable to save this draft in the browser. Please try again.')
    }
  }

  function lookupClient(event) {
    event.preventDefault()
    const client = clients.find((item) => item.id.toLowerCase() === clientId.trim().toLowerCase())
    setSelectedClient(client || null)
    setSimilarCars(null)
    setActiveTab('policy')
    setLookupError(client ? '' : 'No client found with this ID. Check the number or register the client first.')
  }

  const number = (key) => Number(policy[key]) || 0
  const basicPremium = number('vehicleValue') * number('premiumRate') / 100
  const netPremium = Math.max(0, basicPremium - number('discount') + number('loading'))
  const taxAmount = netPremium * number('taxRate') / 100
  const totalPayable = netPremium + number('stampDuty') + number('otherFees') + taxAmount
  const downPayment = number('downPayment')

  function field(label, name, options = {}) {
    const { type = 'text', choices, placeholder, required = false, hint } = options
    return <label className="field-control" key={name}><span>{label}{required && <i> *</i>}</span>{choices
      ? <select name={name} value={policy[name]} onChange={updatePolicy} required={required}>{choices.map((choice) => <option key={choice} value={choice}>{choice}</option>)}</select>
      : <input name={name} type={type} value={policy[name]} onChange={updatePolicy} placeholder={placeholder} required={required} min={type === 'number' ? '0' : undefined} step={type === 'number' ? 'any' : undefined} />}{hint && <small className="policy-field-hint">{hint}</small>}</label>
  }

  return (
    <section className="make-policy-page">
      <div className="registry-heading"><div><span className="eyebrow"><span className="eyebrow-line" /> PRODUCTION (INSURANCE)</span><h2>Make New</h2><p>Start a new policy by linking it to a registered client.</p></div><button className="button-secondary" type="button" onClick={onOpenRegistry}>Client Registry</button></div>
      <div className="policy-stepper"><div className="policy-step active"><span>1</span><strong>Find Client</strong></div><i /><div className={`policy-step ${selectedClient ? 'active' : ''}`}><span>2</span><strong>Policy Details</strong></div><i /><div className={`policy-step ${selectedClient ? 'active' : ''}`}><span>3</span><strong>Technical Details</strong></div><i /><div className={`policy-step ${selectedClient ? 'active' : ''}`}><span>4</span><strong>Invoice Details</strong></div></div>
      <form className="client-lookup-card" onSubmit={lookupClient}><div className="form-section-title"><span className="form-step"><Icon name="search" size={16} /></span><div><h3>Enter Client ID</h3><p>Use the ID generated when the client was registered.</p></div></div><div className="lookup-controls"><input required value={clientId} onChange={(event) => { setClientId(event.target.value); setLookupError(''); setSelectedClient(null) }} placeholder="e.g. NLC-000001" aria-label="Client ID" /><button className="button-primary" type="submit"><Icon name="search" size={17} /> Find Client</button></div>{lookupError && <p className="lookup-error" role="alert">{lookupError}</p>}</form>
      {selectedClient && <>
        <section className="client-detail-card selected-client-card"><div className="profile-section-heading"><div><span className="eyebrow"><span className="eyebrow-line" /> CLIENT FOUND</span><h3>Client Details</h3></div><button type="button" className="text-button" onClick={onOpenRegistry}>Open Client Profile</button></div><div className="selected-client-summary"><span className="client-avatar large"><Icon name={selectedClient.kind === 'company' ? 'settings' : 'users'} size={21} /></span><div><strong>{selectedClient.nameEnglish || selectedClient.nameArabic}</strong><span>{selectedClient.nameArabic}</span></div><b className="client-id">{selectedClient.id}</b></div><div className="client-details-grid"><div className="client-detail"><span>Mobile Number</span><strong dir="ltr">{selectedClient.mobile}</strong></div><div className="client-detail"><span>Email Address</span><strong dir="ltr">{selectedClient.email || '—'}</strong></div><div className="client-detail"><span>Client Type</span><strong>{selectedClient.kind === 'company' ? 'Company' : 'Individual'}</strong></div>{selectedClient.kind === 'company' && <div className="client-detail"><span>Commercial Registration No.</span><strong>{selectedClient.crNumber || '—'}</strong></div>}</div></section>
        <nav className="policy-tabs" aria-label="New policy sections">
          {[['policy', 'Policy Details'], ['technical', 'Technical Details'], ['invoice', 'Invoice Details']].map(([key, label], index) => <button key={key} type="button" className={activeTab === key ? 'active' : ''} aria-current={activeTab === key ? 'step' : undefined} onClick={() => setActiveTab(key)}><span>{index + 1}</span>{label}</button>)}
        </nav>
        {activeTab === 'policy' && <section className="form-section policy-tab-panel">
          <div className="form-section-title"><span className="form-step">1</span><div><h3>Policy Details</h3><p>Policy identification, insurance period, and insured vehicle information.</p></div></div>
          <div className="client-fields">
            <label className="field-control"><span>Policy No.</span><input value={policy.policyNo} readOnly /></label>
            {field('Branch', 'branch', { choices: ['Khartoum', 'Omdurman', 'Bahri', 'Port Sudan', 'Other'], required: true })}
            {field('Class of Insurance', 'classOfInsurance', { choices: ['Motor Comprehensive', 'Motor Third Party', 'Motor Third Party, Fire & Theft'], required: true })}
            {field('Line of Business', 'lineOfBusiness', { choices: ['Private Motor', 'Commercial Motor', 'Motor Fleet', 'Motor Cycle', 'Commercial Vehicle'], required: true })}
            {field('Issue Date', 'issueDate', { type: 'date', required: true })}
            {field('Inception Date', 'inceptionDate', { type: 'date', required: true })}
            {field('Expiry Date', 'expiryDate', { type: 'date', required: true })}
          </div>
          <div className="policy-subheading"><h4>Vehicle Information</h4><p>Enter the vehicle identifiers and risk details.</p></div>
          <div className="client-fields">
            {field('Chassis No.', 'chassisNo')}
            {field('Engine No.', 'engineNo')}
            {field('Plate No.', 'plateNo')}
            {field('Interest of (e.g. mortgagee bank)', 'interestOf', { placeholder: 'Bank or other interested party' })}
            {field('Make', 'make', { placeholder: 'e.g. Toyota' })}
            {field('Model', 'model', { placeholder: 'e.g. Hilux' })}
            {field('Year of Manufacture', 'year', { type: 'number', placeholder: 'e.g. 2022' })}
            {field('Vehicle Use / Type', 'vehicleUse', { choices: ['Private', 'Public / Taxi', 'Commercial', 'Goods Transport', 'Motor Cycle', 'Other'] })}
            {field('Minimum Driver Age', 'minimumDriverAge', { type: 'number', hint: 'Minimum age of any authorized driver.' })}
            {field('Annual Depreciation (%)', 'annualDepreciation', { type: 'number', hint: 'Annual depreciation rate applied to the vehicle value.' })}
            {field('Excess / Deductible (SDG)', 'excess', { type: 'number', hint: 'The insured’s share of an eligible claim.' })}
          </div>
          <div className="similar-cars-box"><div><div><h4>Similar Cars List</h4><p>Check demo records for matching chassis, engine, or plate numbers.</p></div><button type="button" className="button-secondary" onClick={refreshSimilarCars}>Refresh Similar Cars</button></div>{similarCars === null ? <p className="similar-cars-hint">Enter at least one vehicle identifier, then refresh to search.</p> : similarCars.length ? <div className="similar-cars-results">{similarCars.map((car) => <article key={car.chassisNo}><strong>{car.make} {car.model} ({car.year})</strong><span>Chassis: {car.chassisNo}</span><span>Engine: {car.engineNo}</span><span>Plate: {car.plateNo}</span><span>Use: {car.vehicleUse}</span></article>)}</div> : <p className="similar-cars-hint">No matching vehicles found in the demo records.</p>}</div>
        </section>}
        {activeTab === 'technical' && <section className="form-section policy-tab-panel">
          <div className="form-section-title"><span className="form-step">2</span><div><h3>Technical Details</h3><p>Choose covers and applicable policy terms. These sample options are for workflow testing.</p></div></div>
          <div className="technical-subtabs" role="tablist" aria-label="Technical detail categories">{[['covers', 'Covers'], ['terms', 'Terms & Conditions'], ['notes', 'Notes']].map(([key, label]) => <button key={key} role="tab" aria-selected={technicalTab === key} type="button" className={technicalTab === key ? 'active' : ''} onClick={() => setTechnicalTab(key)}>{label}</button>)}</div>
          {technicalTab === 'covers' && <div className="technical-options"><p>Select the covers to include in this policy.</p>{['Accidental Damage', 'Third-Party Liability', 'Fire & Theft', 'Windscreen', 'Personal Accident Benefit', 'Roadside Assistance'].map((cover) => <label key={cover}><input type="checkbox" checked={selectedCovers.includes(cover)} onChange={() => toggleSelection(setSelectedCovers, selectedCovers, cover)} /><span><strong>{cover}</strong><small>Subject to the applicable policy wording and limits.</small></span></label>)}</div>}
          {technicalTab === 'terms' && <div className="technical-options"><p>Confirm the standard terms that apply.</p>{['Geographical Limits', 'Authorized Driver', 'Approved Repairer', 'No Claims Discount', 'Claims Notification'].map((term) => <label key={term}><input type="checkbox" checked={selectedTerms.includes(term)} onChange={() => toggleSelection(setSelectedTerms, selectedTerms, term)} /><span><strong>{term}</strong><small>Apply the approved company wording for this condition.</small></span></label>)}</div>}
          {technicalTab === 'notes' && <label className="field-control policy-notes"><span>Underwriting / Policy Notes</span><textarea name="notes" value={policy.notes} onChange={updatePolicy} rows="6" placeholder="Add any additional underwriting notes or special instructions..." /></label>}
          <p className="technical-admin-note">Technical options shown here are demo defaults. Approved covers and wording should be maintained by the administrator.</p>
        </section>}
        {activeTab === 'invoice' && <section className="form-section policy-tab-panel">
          <div className="form-section-title"><span className="form-step">3</span><div><h3>Invoice Details</h3><p>Enter the vehicle value and premium adjustments. Totals update automatically in SDG.</p></div></div>
          <div className="invoice-reference"><span>Invoice No.</span><strong>INV-{policy.policyNo.replace('NLM-', '')}</strong><span>Client</span><strong>{selectedClient.nameEnglish || selectedClient.nameArabic}</strong><span>Currency</span><strong>SDG</strong></div>
          <div className="policy-subheading"><h4>Premium Calculation</h4><p>Premium rate is entered as a percentage of the insured vehicle value.</p></div>
          <div className="client-fields">
            {field('Vehicle Value / Sum Insured (SDG)', 'vehicleValue', { type: 'number', placeholder: '0.00' })}
            {field('Premium Rate (%)', 'premiumRate', { type: 'number', placeholder: 'e.g. 5' })}
            <label className="field-control"><span>Basic Premium (SDG)</span><input value={basicPremium.toFixed(2)} readOnly /></label>
            {field('Discount (SDG)', 'discount', { type: 'number' })}
            {field('Loading / Additional Premium (SDG)', 'loading', { type: 'number' })}
            <label className="field-control"><span>Net Premium (SDG)</span><input value={netPremium.toFixed(2)} readOnly /></label>
            {field('Stamp Duty / Policy Fee (SDG)', 'stampDuty', { type: 'number' })}
            {field('Other Charges (SDG)', 'otherFees', { type: 'number', placeholder: 'Inspection or service charges' })}
            {field('Tax / Levy Rate (%)', 'taxRate', { type: 'number', hint: 'Confirm the applicable rate with the administrator.' })}
            <label className="field-control"><span>Tax / Levy Amount (SDG)</span><input value={taxAmount.toFixed(2)} readOnly /></label>
            {field('Commission Rate (%)', 'commissionRate', { type: 'number', hint: 'For internal reference; not deducted from the customer total.' })}
            <label className="field-control"><span>Commission Amount (SDG)</span><input value={(netPremium * number('commissionRate') / 100).toFixed(2)} readOnly /></label>
          </div>
          <div className="invoice-total"><span>Total Premium Payable</span><strong>{totalPayable.toFixed(2)} <small>SDG</small></strong></div>
          <div className="policy-subheading"><h4>Payment & Invoice</h4><p>Optional collection and payment tracking details.</p></div>
          <div className="client-fields">
            {field('Down Payment (SDG)', 'downPayment', { type: 'number' })}
            <label className="field-control"><span>Balance Due (SDG)</span><input value={Math.max(0, totalPayable - downPayment).toFixed(2)} readOnly /></label>
            {field('Number of Installments', 'installments', { type: 'number' })}
            {field('Payment Due Date', 'dueDate', { type: 'date' })}
            {field('Payment Method', 'paymentMethod', { choices: ['Cash', 'Bank Transfer', 'Cheque', 'Other'] })}
            {field('Payment Status', 'paymentStatus', { choices: ['Unpaid', 'Partially Paid', 'Paid'] })}
          </div>
          {policy.notes && <div className="invoice-notes"><strong>Policy Notes</strong><p>{policy.notes}</p></div>}
        </section>}
        <div className="policy-form-actions"><div role="status" className="draft-message">{draftMessage || 'Demo mode: drafts are saved only in this browser.'}</div><div>{activeTab !== 'policy' && <button className="button-secondary" type="button" onClick={() => setActiveTab(activeTab === 'invoice' ? 'technical' : 'policy')}>Previous</button>}{activeTab !== 'invoice' ? <button className="button-primary" type="button" onClick={() => setActiveTab(activeTab === 'policy' ? 'technical' : 'invoice')}>Continue</button> : <><button className="button-secondary" type="button" onClick={saveDraft}>Save Draft</button><button className="button-primary" type="button" onClick={() => onSubmit({ ...policy, clientId: selectedClient.id, clientName: selectedClient.nameEnglish || selectedClient.nameArabic, selectedCovers, selectedTerms, basicPremium, netPremium, taxAmount, totalPayable, downPayment, commissionAmount: netPremium * number('commissionRate') / 100 })}>Save &amp; Submit for Approval</button></>}</div></div>
      </>}
    </section>
  )
}

function ApprovalPage({ role, entries, onApprove }) {
  const [selectedId, setSelectedId] = useState('')
  const isManager = role === 'manager'
  const visibleEntries = entries.filter((entry) => isManager
    ? ['pending_manager', 'issued'].includes(entry.status)
    : entry.status === 'pending_admin')
  const selectedEntry = visibleEntries.find((entry) => entry.id === selectedId) || visibleEntries[0]
  const amount = (value) => (Number(value) || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  const detailFields = selectedEntry ? [
    ['Client name', selectedEntry.clientName],
    ['Client ID', selectedEntry.clientId],
    ['Branch', selectedEntry.branch],
    ['Policy no.', selectedEntry.policyNo],
    ['Class of insurance', selectedEntry.classOfInsurance],
    ['Line of business', selectedEntry.lineOfBusiness],
    ['Issue date', selectedEntry.issueDate],
    ['Inception date', selectedEntry.inceptionDate],
    ['Expiry date', selectedEntry.expiryDate],
    ['Chassis no.', selectedEntry.chassisNo],
    ['Engine no.', selectedEntry.engineNo],
    ['Plate no.', selectedEntry.plateNo],
    ['Vehicle', `${selectedEntry.year || ''} ${selectedEntry.make || ''} ${selectedEntry.model || ''}`.trim()],
    ['Vehicle value', `${amount(selectedEntry.vehicleValue)} SDG`],
    ['Covers', (selectedEntry.selectedCovers || []).join(', ')],
    ['Terms', (selectedEntry.selectedTerms || []).join(', ')],
    ['Notes', selectedEntry.notes],
  ] : []

  return (
    <section className="approval-page">
      <div className="registry-heading">
        <div>
          <span className="eyebrow"><span className="eyebrow-line" /> PRODUCTION (INSURANCE)</span>
          <h2>{isManager ? 'Production Entry Approval' : 'Entry Approval'}</h2>
          <p>{isManager ? 'Review key production details, approve entries, and print issued documents.' : 'Review complete policy submissions and forward them to the production manager.'}</p>
        </div>
        <span className="approval-count">{visibleEntries.filter((entry) => entry.status !== 'issued').length} awaiting your approval</span>
      </div>
      <div className="approval-layout">
        <div className="approval-queue">
          <h3>Approval Queue</h3>
          {visibleEntries.length ? visibleEntries.map((entry) => (
            <button key={entry.id} type="button" className={`approval-queue-item ${selectedEntry?.id === entry.id ? 'selected' : ''}`} onClick={() => setSelectedId(entry.id)}>
              <span className="approval-queue-top">
                <strong>{entry.policyNo}</strong>
                <span className={`status-badge ${entry.status === 'issued' ? 'green' : 'amber'}`}><i />{entry.status === 'issued' ? 'Issued' : entry.status === 'pending_manager' ? 'Manager review' : 'Admin review'}</span>
              </span>
              <span>{entry.clientName}</span>
              <small>{entry.classOfInsurance} · {entry.branch} · {entry.issueDate}</small>
              <strong className="approval-amount">{amount(entry.totalPayable)} SDG</strong>
            </button>
          )) : (
            <div className="approval-empty"><Icon name="file" size={24} /><strong>Nothing to review yet</strong><span>Submitted policies will appear here.</span></div>
          )}
        </div>
        <div className="approval-detail">
          {selectedEntry ? (
            <>
              <div className="approval-detail-heading">
                <span className="eyebrow"><span className="eyebrow-line" /> {isManager ? 'PRODUCTION REVIEW' : 'ADMIN REVIEW'}</span>
                <h3>{selectedEntry.policyNo}</h3>
                <p>Submitted by {selectedEntry.submittedBy || 'Production Officer'}</p>
              </div>
              <div className="approval-key-details">
                {detailFields.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value || '—'}</strong></div>)}
              </div>
              {selectedEntry.status === 'pending_admin' && !isManager && (
                <button className="button-primary approval-action" type="button" onClick={() => onApprove(selectedEntry.id, 'pending_manager')}>Approve &amp; Send to Production</button>
              )}
              {selectedEntry.status === 'pending_manager' && isManager && (
                <button className="button-primary approval-action" type="button" onClick={() => onApprove(selectedEntry.id, 'issued')}>Approve &amp; Issue Policy</button>
              )}
              {selectedEntry.status === 'issued' && isManager && (
                <div className="issued-documents">
                  <div className="issued-heading">
                    <div><h3>Issued Documents</h3><p>Print the policy, customer debit note, and broker credit note.</p></div>
                    <button className="button-primary no-print" type="button" onClick={() => window.print()}>Print All Documents</button>
                  </div>
                  <article className="print-document">
                    <div className="print-document-brand"><BrandMark /><span>EL NILEIN INSURANCE</span></div>
                    <h2>Motor Insurance Policy</h2>
                    <div className="print-document-grid">
                      {[
                        ['Policy No.', selectedEntry.policyNo], ['Client', selectedEntry.clientName],
                        ['Client ID', selectedEntry.clientId], ['Branch', selectedEntry.branch],
                        ['Class of Insurance', selectedEntry.classOfInsurance], ['Line of Business', selectedEntry.lineOfBusiness],
                        ['Issue Date', selectedEntry.issueDate], ['Inception Date', selectedEntry.inceptionDate],
                        ['Expiry Date', selectedEntry.expiryDate], ['Vehicle', `${selectedEntry.year || ''} ${selectedEntry.make || ''} ${selectedEntry.model || ''}`.trim()],
                        ['Chassis No.', selectedEntry.chassisNo], ['Engine No.', selectedEntry.engineNo],
                        ['Plate No.', selectedEntry.plateNo], ['Sum Insured', `${amount(selectedEntry.vehicleValue)} SDG`],
                        ['Covers', (selectedEntry.selectedCovers || []).join(', ')], ['Terms', (selectedEntry.selectedTerms || []).join(', ')],
                        ['Notes', selectedEntry.notes],
                      ].map(([label, value]) => <div key={label}><span>{label}</span><strong>{value || '—'}</strong></div>)}
                    </div>
                    <p className="print-signature">Authorized signature: ____________________</p>
                  </article>
                  <article className="print-document financial-document">
                    <div className="print-document-brand"><BrandMark /><span>EL NILEIN INSURANCE</span></div>
                    <h2>Debit Note</h2>
                    <p>Premium and payment details for the policy listed below</p>
                    <div className="print-document-grid">
                      {[
                        ['Debit Note No.', `DN-${selectedEntry.policyNo}`], ['Policy No.', selectedEntry.policyNo],
                        ['Client', selectedEntry.clientName], ['Date', selectedEntry.issueDate],
                        ['Net Premium', `${amount(selectedEntry.netPremium)} SDG`], ['Tax', `${amount(selectedEntry.taxAmount)} SDG`],
                        ['Total Payable', `${amount(selectedEntry.totalPayable)} SDG`], ['Down Payment', `${amount(selectedEntry.downPayment)} SDG`],
                        ['Payment Method', selectedEntry.paymentMethod], ['Payment Status', selectedEntry.paymentStatus],
                      ].map(([label, value]) => <div key={label}><span>{label}</span><strong>{value || '—'}</strong></div>)}
                    </div>
                    <p className="print-signature">Cashier: ____________________</p>
                  </article>
                  <article className="print-document financial-document">
                    <div className="print-document-brand"><BrandMark /><span>EL NILEIN INSURANCE</span></div>
                    <h2>Broker Credit Note</h2>
                    <p>Broker commission for the policy listed below</p>
                    <div className="print-document-grid">
                      {[
                        ['Credit Note No.', `CN-${selectedEntry.policyNo}`], ['Policy No.', selectedEntry.policyNo],
                        ['Client', selectedEntry.clientName], ['Broker', 'Broker'],
                        ['Date', selectedEntry.issueDate], ['Net Premium', `${amount(selectedEntry.netPremium)} SDG`],
                        ['Commission Rate', `${selectedEntry.commissionRate}%`], ['Commission Amount', `${amount(selectedEntry.commissionAmount)} SDG`],
                      ].map(([label, value]) => <div key={label}><span>{label}</span><strong>{value || '—'}</strong></div>)}
                    </div>
                    <p className="print-signature">Authorized signature: ____________________</p>
                  </article>
                </div>
              )}
            </>
          ) : (
            <div className="approval-empty approval-detail-empty"><strong>Select a policy to review</strong><span>Policy details will appear here.</span></div>
          )}
        </div>
      </div>
    </section>
  )
}

function loadDemoApprovals() {
  try {
    const storedEntries = localStorage.getItem('nilein-demo-approvals')
    if (!storedEntries) return []
    const entries = JSON.parse(storedEntries)
    if (Array.isArray(entries) && entries.every((entry) => (
      typeof entry.id === 'string'
      && typeof entry.policyNo === 'string'
      && ['pending_admin', 'pending_manager', 'issued'].includes(entry.status)
    ))) return entries
    throw new Error('Stored policy approval queue has an invalid shape.')
  } catch (error) {
    console.error('Unable to load the saved demo policy approval queue.', error)
    return []
  }
}

function loadDemoClients() {
  const storedClients = localStorage.getItem('nilein-demo-clients')
  if (!storedClients) return []

  try {
    const clients = JSON.parse(storedClients)
    if (Array.isArray(clients) && clients.every((client) => typeof client.id === 'string' && typeof client.nameArabic === 'string')) return clients
    throw new Error('Stored client registry has an invalid shape.')
  } catch (error) {
    console.error('Unable to load the saved demo client registry.', error)
    return []
  }
}

function App() {
  const [user, setUser] = useState(() => accounts.find((account) => account.id === sessionStorage.getItem('nilein-demo-account')) ?? null)
  const [activePage, setActivePage] = useState('Dashboard')
  const [query, setQuery] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)
  const [productionOpen, setProductionOpen] = useState(false)
  const [productionMenuOpen, setProductionMenuOpen] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [toast, setToast] = useState('')
  const [period, setPeriod] = useState('This week')
  const [policies, setPolicies] = useState(initialPolicies)
  const [clients, setClients] = useState(loadDemoClients)
  const [approvalEntries, setApprovalEntries] = useState(loadDemoApprovals)
  const [policyClientId, setPolicyClientId] = useState('')
  const [newClient, setNewClient] = useState('')
  const [newType, setNewType] = useState('Motor Insurance')

  const visibleNavigation = navigation.filter((item) => (
    item.audience === 'all'
    || (item.audience === 'admin' && user?.id === 'admin')
    || (item.audience === 'manager' && user?.id === 'manager')
    || (item.audience === 'cars' && user?.id === 'cars')
  ))
  const dashboard = user ? dashboardData[user.id] : dashboardData.admin
  const visiblePolicies = useMemo(
    () => policies.filter((policy) => (!user?.line || policy.type === user.line) && `${policy.id} ${policy.client} ${policy.type}`.toLowerCase().includes(query.trim().toLowerCase())),
    [policies, query, user],
  )

  function login(account) {
    sessionStorage.setItem('nilein-demo-account', account.id)
    setUser(account)
    setActivePage('Dashboard')
    setQuery('')
    setShowNotifications(false)
    setProductionMenuOpen(false)
  }

  function logout() {
    sessionStorage.removeItem('nilein-demo-account')
    setUser(null)
    setActivePage('Dashboard')
    setShowCreateModal(false)
    setShowNotifications(false)
    setQuery('')
    setToast('')
    setProductionMenuOpen(false)
  }

  function showMessage(message) {
    setToast(message)
    window.setTimeout(() => setToast(''), 2800)
  }

  function persistApprovalEntries(nextEntries) {
    try {
      localStorage.setItem('nilein-demo-approvals', JSON.stringify(nextEntries))
      setApprovalEntries(nextEntries)
      return true
    } catch (error) {
      console.error('Unable to save the demo policy approval queue.', error)
      showMessage('Unable to save this policy in the browser. Please try again.')
      return false
    }
  }

  function submitPolicy(policy, amounts) {
    if (!user || !policy.policyNo) return
    const entry = {
      ...policy,
      ...amounts,
      id: policy.policyNo,
      submittedAt: new Date().toISOString(),
      submittedBy: user.name,
      status: 'pending_admin',
    }
    if (approvalEntries.some((item) => item.id === entry.id)) {
      showMessage('This policy has already been submitted for approval.')
      return
    }
    if (persistApprovalEntries([entry, ...approvalEntries])) showMessage('Policy saved and submitted for admin approval.')
  }

  function approvePolicy(entryId, status) {
    const entry = approvalEntries.find((item) => item.id === entryId)
    if (!entry || !user) return
    const timestamp = new Date().toISOString()
    const updatedEntry = {
      ...entry,
      status,
      ...(status === 'pending_manager'
        ? { adminApprovedAt: timestamp, adminApprovedBy: user.name }
        : { managerApprovedAt: timestamp, managerApprovedBy: user.name }),
    }
    const nextEntries = approvalEntries.map((item) => item.id === entryId ? updatedEntry : item)
    if (!persistApprovalEntries(nextEntries)) return

    if (status === 'pending_manager') {
      showMessage('Policy approved and sent to Production Entry Approval.')
    } else if (status === 'issued') {
      setPolicies((current) => [
        {
          id: entry.policyNo,
          client: entry.clientName,
          type: entry.classOfInsurance,
          date: entry.issueDate,
          amount: Number(entry.totalPayable || 0).toLocaleString('en-US'),
          status: 'Active',
          color: 'green',
        },
        ...current.filter((policy) => policy.id !== entry.policyNo),
      ])
      showMessage('Policy approved and issued. Documents are ready to print.')
    }
  }

  function persistClients(nextClients) {
    try {
      localStorage.setItem('nilein-demo-clients', JSON.stringify(nextClients))
      setClients(nextClients)
      return true
    } catch (error) {
      console.error('Unable to save the demo client registry.', error)
      showMessage('Unable to save client details in this browser. Please try again.')
      return false
    }
  }

  function createClient(data) {
    const nextNumber = clients.reduce((highest, client) => {
      const number = Number(client.id.match(/\d+$/)?.[0] || 0)
      return Math.max(highest, number)
    }, 0) + 1
    const savedClient = { ...data, id: `NLC-${String(nextNumber).padStart(6, '0')}`, createdAt: new Date().toISOString() }
    return persistClients([savedClient, ...clients]) ? savedClient : null
  }

  function updateClient(clientId, data) {
    const nextClients = clients.map((client) => client.id === clientId ? { ...client, ...data, id: clientId, updatedAt: new Date().toISOString() } : client)
    if (persistClients(nextClients)) showMessage('Client details updated.')
  }

  function createPolicy(event) {
    event.preventDefault()
    if (!newClient.trim() || !user) return
    const type = user.line || newType
    const policy = {
      id: `NI-2025-${String(843 + policies.length - initialPolicies.length).padStart(4, '0')}`,
      client: newClient.trim(),
      type,
      date: 'Today',
      amount: '—',
      status: 'Under Review',
      color: 'amber',
    }
    setPolicies((current) => [policy, ...current])
    setQuery('')
    setNewClient('')
    setShowCreateModal(false)
    showMessage('Policy request created successfully.')
  }

  if (!user) return <LoginPage onLogin={login} />

  return (
    <div className="app-shell" dir="ltr">
      <aside className="sidebar">
        <div className="sidebar-brand"><BrandMark /><span className="brand-caption">{user.department}</span></div>
        <div className="workspace-label">MAIN MENU</div>
        <nav className="main-nav" aria-label="Main menu">
          {visibleNavigation.map((item) => (
            item.audience === 'cars' ? <div className="nav-production-group" key={item.label}>
              <button className={`nav-link production-nav-link ${productionOpen || activePage === 'Client Registry' || activePage === 'Make New' ? 'active' : ''}`} type="button" aria-expanded={productionOpen} onClick={() => setProductionOpen((open) => !open)}>
                <Icon name={item.icon} size={19} /><span>{item.label}</span><Icon name="chevron" size={15} />
              </button>
              {productionOpen && <div className="production-subnav">
                <button className={activePage === 'Client Registry' ? 'active' : ''} type="button" onClick={() => { setActivePage('Client Registry'); setProductionMenuOpen(false) }}>Client Registry</button>
                <button className={activePage === 'Make New' ? 'active' : ''} type="button" onClick={() => { setActivePage('Make New'); setProductionMenuOpen(false); setPolicyClientId('') }}>Make New</button>
              </div>}
            </div> : <button className={`nav-link ${activePage === item.label ? 'active' : ''}`} key={item.label} onClick={() => setActivePage(item.label)} type="button">
              <Icon name={item.icon} size={19} /><span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-spacer" />
        <div className="support-card"><div className="support-icon"><Icon name="shield" size={18} /></div><strong>Need help?</strong><span>Our support team is here for you.</span><button type="button" onClick={() => showMessage('Our support team will be in touch soon.')}>Contact Support <span>→</span></button></div>
        <div className="sidebar-footer"><span className="online-dot" /> All systems operational</div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="mobile-brand"><BrandMark /></div>
          <div className="breadcrumb"><span>Home</span><b>/</b><strong>{activePage}</strong></div>
          <div className="topbar-actions">
            <label className="search-box"><Icon name="search" size={18} /><input aria-label="Search clients or policies" placeholder={`Search ${user.line || 'clients and policies'}...`} value={query} onChange={(event) => setQuery(event.target.value)} /><kbd>⌘ K</kbd></label>
            <div className="popover-anchor">
              <button className={`icon-button notification-button ${showNotifications ? 'selected' : ''}`} type="button" aria-label="Notifications" onClick={() => setShowNotifications(!showNotifications)}><Icon name="bell" size={19} /><i /></button>
              {showNotifications && <div className="notification-popover"><strong>Notifications</strong><p><span className="notification-dot" /> Policies are waiting for review in {user.line || 'your insurance branches'}.</p><p><span className="notification-dot muted" /> Check the latest system reports.</p></div>}
            </div>
            <div className="topbar-divider" />
            <div className="profile-wrap"><div className="avatar">{user.name.slice(0, 1)}</div><div className="profile-text"><strong>{user.name}</strong><span>{user.role}</span></div><button type="button" className="logout-button" onClick={logout}><Icon name="logout" size={17} /><span>Sign out</span></button></div>
          </div>
        </header>

        <div className="page-content">
          {user.id === 'cars' && activePage === 'Client Registry' ? <ClientRegistry clients={clients} onCreate={createClient} onUpdate={updateClient} onStartPolicy={(clientId) => { setPolicyClientId(clientId); setActivePage('Make New') }} />
            : user.id === 'cars' && activePage === 'Make New' ? <MakeNewPolicy clients={clients} initialClientId={policyClientId} onOpenRegistry={() => { setActivePage('Client Registry'); setPolicyClientId('') }} onSubmit={submitPolicy} />
              : (user.id === 'admin' && activePage === 'Entry Approval') || (user.id === 'manager' && activePage === 'Production Entry Approval') ? <ApprovalPage role={user.id} entries={approvalEntries} onApprove={approvePolicy} />
              : <>
          <section className="welcome-row">
            <div><p className="eyebrow"><span className="eyebrow-line" /> {new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(new Date())}</p><h1>Good morning, {user.name.split(' ')[0]} <span>👋</span></h1><p className="welcome-subtitle">{user.line ? `Welcome to your ${user.department} workspace.` : 'Here is today’s overview of El Nilein Insurance.'}</p></div>
            {user.id === 'cars' ? <button className="button-primary production-trigger" type="button" aria-expanded={productionMenuOpen} onClick={() => setProductionMenuOpen((open) => !open)}><Icon name="shield" size={18} /> Production (Insurance) <Icon name="chevron" size={16} /></button> : <button className="button-primary" type="button" onClick={() => { setNewType(user.line || 'Motor Insurance'); setShowCreateModal(true) }}><Icon name="plus" size={18} /> {user.line ? 'Register Client & Create Policy' : 'Create New Policy'}</button>}
          </section>
          {user.id === 'cars' && productionMenuOpen && <div className="production-quick-menu"><button type="button" onClick={() => { setActivePage('Client Registry'); setProductionMenuOpen(false) }}><span className="quick-menu-icon"><Icon name="users" size={18} /></span><span><strong>Client Registry</strong><small>Register a client or search existing profiles.</small></span><span className="quick-menu-arrow">→</span></button><button type="button" onClick={() => { setActivePage('Make New'); setPolicyClientId(''); setProductionMenuOpen(false) }}><span className="quick-menu-icon"><Icon name="file" size={18} /></span><span><strong>Make New</strong><small>Start a policy for a registered client.</small></span><span className="quick-menu-arrow">→</span></button></div>}

          <section className="hero-banner">
            <div className="hero-pattern" />
            <div className="hero-content"><span className="hero-kicker"><span /> {user.line || 'EL NILEIN DASHBOARD'}</span><h2>{dashboard.heroTitle}<br /><span>{dashboard.heroSubtitle}</span></h2><p>{dashboard.heroDescription}</p><button type="button" className="hero-button" onClick={() => setActivePage('Insurance Policies')}>Explore {user.line ? `${user.line} policies` : 'insurance policies'} <span>→</span></button></div>
            <div className="hero-art" aria-hidden="true"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="hero-shield"><Icon name={user.id === 'cars' ? 'car' : user.id === 'agriculture' ? 'leaf' : user.id === 'livestock' ? 'heart' : 'shield'} size={72} /><span className="shield-check">✓</span></div><div className="floating-card card-top"><span className="mini-icon"><Icon name={user.id === 'cars' ? 'car' : user.id === 'agriculture' ? 'leaf' : 'shield'} size={16} /></span><span><b>{user.line || 'Comprehensive Cover'}</b><small>Protection around the clock</small></span><i>✓</i></div><div className="floating-card card-bottom"><span className="mini-icon gray"><Icon name="heart" size={16} /></span><span><b>Peace of mind</b><small>With you every step</small></span></div></div>
            <div className="hero-pagination"><i className="current" /><i /><i /></div>
          </section>

          <section className="stats-grid" aria-label="Performance summary">
            <article className="stat-card"><div className="stat-top"><span className="stat-icon icon-blue"><Icon name="file" size={20} /></span><span className="stat-trend positive"><Icon name="arrow" size={13} /> 12.8%</span></div><span className="stat-label">{user.line ? `Active ${user.line} Policies` : 'Active Policies'}</span><div className="stat-value">{dashboard.policies} <small>policies</small></div><div className="stat-foot"><span>vs. last month</span><div className="mini-sparkline blue-line"><i /><i /><i /><i /><i /><i /><i /></div></div></article>
            <article className="stat-card"><div className="stat-top"><span className="stat-icon icon-green"><Icon name="wallet" size={20} /></span><span className="stat-trend positive"><Icon name="arrow" size={13} /> 8.2%</span></div><span className="stat-label">Premiums Collected</span><div className="stat-value">{dashboard.premium} <small>SDG</small></div><div className="stat-foot"><span>vs. last month</span><div className="mini-sparkline green-line"><i /><i /><i /><i /><i /><i /><i /></div></div></article>
            <article className="stat-card"><div className="stat-top"><span className="stat-icon icon-amber"><Icon name="shield" size={20} /></span><span className="stat-trend warning">Needs attention</span></div><span className="stat-label">Claims in Progress</span><div className="stat-value">{dashboard.claims} <small>claims</small></div><div className="stat-foot"><span>New claims today</span><div className="mini-sparkline amber-line"><i /><i /><i /><i /><i /><i /><i /></div></div></article>
            <article className="stat-card"><div className="stat-top"><span className="stat-icon icon-slate"><Icon name="users" size={20} /></span><span className="stat-trend positive"><Icon name="arrow" size={13} /> 5.4%</span></div><span className="stat-label">{dashboard.clientLabel}</span><div className="stat-value">{dashboard.clients} <small>clients</small></div><div className="stat-foot"><span>New this month</span><div className="mini-sparkline slate-line"><i /><i /><i /><i /><i /><i /><i /></div></div></article>
          </section>

          <section className="overview-grid">
            <article className="panel performance-panel"><div className="panel-heading"><div><h2>Performance Overview</h2><p>{user.line ? `${user.line} premiums and policies over time` : 'Premiums and new policies during the selected period'}</p></div><button className="select-button" type="button" onClick={() => setPeriod(period === 'This week' ? 'This month' : 'This week')}><Icon name="calendar" size={15} />{period}<Icon name="chevron" size={14} /></button></div><div className="chart-legend"><span><i className="legend-blue" /> Premiums Collected</span><span><i className="legend-gray" /> New Policies</span></div><div className="chart-wrap"><div className="y-labels"><span>100k</span><span>75k</span><span>50k</span><span>25k</span><span>0</span></div><div className="chart-main"><div className="chart-grid"><i /><i /><i /><i /><i /></div><div className="bars">{[['4', 44, 26], ['5', 62, 38], ['6', 51, 30], ['7', 76, 46], ['8', 58, 34], ['9', 88, 52], ['10', 69, 40], ['11', 96, 59], ['12', 74, 44], ['13', 83, 52], ['14', 62, 36], ['15', 91, 56]].map(([day, blue, gray]) => <div className="bar-group" key={day}><div className="bar-pair"><i className="bar gray-bar" style={{ height: `${gray}%` }} /><i className="bar blue-bar" style={{ height: `${blue}%` }} /></div><span>{day}</span></div>)}</div></div></div></article>
            <article className="panel portfolio-panel"><div className="panel-heading"><div><h2>{user.line || 'Insurance Portfolio'}</h2><p>{user.line ? 'Portfolio overview' : 'Policies by insurance type'}</p></div><button type="button" className="more-button" aria-label="More portfolio options" onClick={() => showMessage('Portfolio details are coming soon.') }><Icon name="dots" size={19} /></button></div><div className="portfolio-chart"><svg viewBox="0 0 180 180" role="img" aria-label="Insurance portfolio breakdown"><circle cx="90" cy="90" r="66" fill="none" stroke="#edf0f5" strokeWidth="15" /><circle cx="90" cy="90" r="66" fill="none" stroke="#24499a" strokeWidth="15" strokeDasharray="177 415" strokeDashoffset="0" strokeLinecap="round" transform="rotate(-90 90 90)" /><circle cx="90" cy="90" r="66" fill="none" stroke="#8794ad" strokeWidth="15" strokeDasharray="116 415" strokeDashoffset="-187" strokeLinecap="round" transform="rotate(-90 90 90)" /><circle cx="90" cy="90" r="66" fill="none" stroke="#d7a752" strokeWidth="15" strokeDasharray="70 415" strokeDashoffset="-313" strokeLinecap="round" transform="rotate(-90 90 90)" /><circle cx="90" cy="90" r="66" fill="none" stroke="#cfd5df" strokeWidth="15" strokeDasharray="28 415" strokeDashoffset="-393" strokeLinecap="round" transform="rotate(-90 90 90)" /></svg><div className="donut-label"><strong>{dashboard.policies}</strong><span>Active Policies</span></div></div><div className="portfolio-legend"><div><i className="portfolio-blue" /><span>Motor</span><strong>42%</strong></div><div><i className="portfolio-slate" /><span>Health</span><strong>28%</strong></div><div><i className="portfolio-amber" /><span>Agriculture</span><strong>17%</strong></div><div><i className="portfolio-gray" /><span>Other</span><strong>13%</strong></div></div></article>
          </section>

          <section className="panel policies-panel"><div className="panel-heading policies-heading"><div><h2>{user.line ? `Latest ${user.line} Policies` : 'Latest Insurance Policies'}</h2><p>{query ? `Search results for "${query}"` : 'Track the latest issued policies'}</p></div><button className="text-button" type="button" onClick={() => setActivePage('Insurance Policies')}>View All Policies <span>→</span></button></div><div className="table-scroll"><table><thead><tr><th>Policy ID</th><th>Client</th><th>Insurance Type</th><th>Issue Date</th><th>Premium</th><th>Status</th><th aria-label="Actions" /></tr></thead><tbody>
            {visiblePolicies.slice(0, 5).map((policy) => <tr key={policy.id}><td className="policy-id">{policy.id}</td><td><span className="client-avatar" aria-hidden="true"><Icon name="users" size={12} /></span>{policy.client}</td><td>{policy.type}</td><td>{policy.date}</td><td className="amount-cell">{policy.amount}<small> SDG</small></td><td><span className={`status-badge ${policy.color}`}><i />{policy.status}</span></td><td><button className="row-more" aria-label={`Options for ${policy.id}`} type="button" onClick={() => showMessage(`Options for policy ${policy.id}`)}><Icon name="dots" size={18} /></button></td></tr>)}
            {visiblePolicies.length === 0 && <tr><td className="empty-state" colSpan="7">No policies match your search. Try another term.</td></tr>}
          </tbody></table></div><div className="table-footer"><span>Showing <strong>{Math.min(visiblePolicies.length, 5)}</strong> of <strong>{visiblePolicies.length}</strong> policies</span><div className="pagination"><button type="button" disabled aria-label="Previous page">‹</button><button type="button" className="page-active">1</button><button type="button" onClick={() => showMessage('You are on the first page.')}>2</button><button type="button" onClick={() => showMessage('You are on the first page.')}>3</button><span>...</span><button type="button" onClick={() => showMessage('You are on the first page.')}>12</button><button type="button" aria-label="Next page" onClick={() => showMessage('You are on the first page.')}>›</button></div></div></section>

          <footer className="page-footer"><span>© 2025 El Nilein Insurance. All rights reserved.</span><span><i className="online-dot" /> Demo Environment</span></footer>
              </>}
        </div>
      </main>

      {showCreateModal && <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowCreateModal(false) }}><form className="create-modal" onSubmit={createPolicy}><div className="modal-heading"><div><span className="modal-icon"><Icon name="file" size={20} /></span><div><h2>{user.line ? 'Register Client & Create Policy' : 'Create a New Policy'}</h2><p>Enter the client and insurance details to get started.</p></div></div><button type="button" className="icon-button" aria-label="Close" onClick={() => setShowCreateModal(false)}><Icon name="close" size={19} /></button></div><label>Client Name<input autoFocus required value={newClient} onChange={(event) => setNewClient(event.target.value)} placeholder="e.g. Horizon Transport Co." /></label>{user.line ? <div className="fixed-insurance-type"><span>Insurance Type</span><strong>{user.line}</strong></div> : <label>Insurance Type<select value={newType} onChange={(event) => setNewType(event.target.value)}><option>Motor Insurance</option><option>Agricultural Insurance</option><option>Livestock Insurance</option><option>Health Insurance</option><option>Property Insurance</option></select></label>}<div className="modal-actions"><button type="button" className="button-secondary" onClick={() => setShowCreateModal(false)}>Cancel</button><button type="submit" className="button-primary"><Icon name="plus" size={17} /> Create Request</button></div></form></div>}
      {toast && <div className="toast"><span>✓</span>{toast}</div>}
    </div>
  )
}

export default App
