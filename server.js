const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.json({ limit: '100mb' }));

const NIM_API_BASE = process.env.NIM_API_BASE || 'https://integrate.api.nvidia.com/v1';
const NIM_API_KEY = process.env.NIM_API_KEY;

const MODEL_MAPPING = {
'gpt-3.5-turbo': { model: 'meta/llama-3.1-8b-instruct' },
'gpt-4':         { model: 'meta/llama-3.1-70b-instruct' },
'gpt-4-turbo':   { model: 'meta/llama-3.1-70b-instruct' },
'gpt-4o':        { model: 'meta/llama-3.1-405b-instruct' },
'claude-3-opus':   { model: 'meta/llama-3.1-405b-instruct' },
'claude-3-sonnet': { model: 'meta/llama-3.1-70b-instruct' },
'gemini-pro':      { model: 'meta/llama-3.1-70b-instruct' },
'deepseek-v4-pro': {
model: 'deepseek-ai/deepseek-v4-pro',
extra_body: { chat_template_kwargs: { thinking: false } }
},
'glm-5': {
model: 'z-ai/glm-5.1',
extra_body: { chat_template_kwargs: { enable_thinking: true, clear_thinking: false } }
},
'minimax-m2.7': { model: 'minimaxai/minimax-m2.7' }
};

app.get('/health', (req, res) => {
