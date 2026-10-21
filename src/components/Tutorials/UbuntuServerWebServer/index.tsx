import { Arrow, Box, CodeBlock, Panel, SectionShell } from '../Shared'

const ReverseProxyDiagram = () => (
  <Panel
    label="Why Almost Every Server Runs A Reverse Proxy"
    caption="Nginx handles the messy, security-sensitive parts (TLS, static files) so your app doesn't have to"
  >
    <div className="flex flex-col items-center gap-2 py-2 w-full">
      <Box>Visitor → https://example.com</Box>
      <Arrow />
      <Box className="border-green-500/60">Nginx on port 443 — terminates TLS, serves static files</Box>
      <Arrow />
      <Box>Forwards dynamic requests to your app on 127.0.0.1:3000</Box>
    </div>
  </Panel>
)

const NginxSetupSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Nginx As A Reverse Proxy</span>
    <CodeBlock label="terminal">{`sudo apt install nginx
sudo ufw allow 'Nginx Full'
sudo systemctl enable --now nginx`}</CodeBlock>
    <CodeBlock label="/etc/nginx/sites-available/example.com">{`server {
    listen 80;
    server_name example.com www.example.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}`}</CodeBlock>
    <CodeBlock label="terminal">{`sudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/
sudo nginx -t                   # ALWAYS test config before reloading
sudo systemctl reload nginx`}</CodeBlock>
    <p className="text-white leading-relaxed text-sm">
      The app itself only ever listens on <code>127.0.0.1</code>, never on a public interface — Nginx is the only
      thing the outside world can actually reach, which is exactly the point.
    </p>
  </div>
)

const TlsSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Free TLS With Let's Encrypt (Certbot)</span>
    <p className="text-white leading-relaxed text-sm">
      Running a public site over plain HTTP in 2026 isn't acceptable — browsers actively flag it, and Let's
      Encrypt makes a trusted certificate free and automatically renewing.
    </p>
    <CodeBlock label="terminal">{`sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d example.com -d www.example.com
# certbot edits the Nginx config itself, adding the listen 443 block and the cert paths

sudo certbot renew --dry-run     # confirm auto-renewal works without waiting 90 days to find out
systemctl list-timers | grep certbot   # the systemd timer that renews it automatically, twice a day`}</CodeBlock>
  </div>
)

export const UbuntuServerWebServerSection = () => (
  <SectionShell
    title="Running A Web Server"
    paragraphs={[
      "The single most common thing an Ubuntu Server runs: a reverse proxy sitting in front of an app, handling TLS and static files, forwarding everything else to the real application process.",
    ]}
  >
    <div className="space-y-6">
      <ReverseProxyDiagram />
      <NginxSetupSection />
      <TlsSection />
    </div>
  </SectionShell>
)
