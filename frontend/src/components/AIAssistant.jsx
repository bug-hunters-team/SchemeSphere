import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Bot, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  User, 
  ArrowRight
} from 'lucide-react';
import { askAssistant } from '../services/assistantApi';

export default function AIAssistant({ onOpenChatModal }) {
  const { t, i18n } = useTranslation();
  const conversations = [
    { id: 1, questionKey: 'assistant.questionFarmer', tag: t('assistant.questionFarmer') },
    { id: 2, questionKey: 'assistant.questionStudent', tag: t('assistant.questionStudent') },
    { id: 3, questionKey: 'assistant.questionHealth', tag: t('assistant.questionHealth') },
  ];
  const [activeConversationId, setActiveConversationId] = useState(1);
  const [customInput, setCustomInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      role: 'user',
      text: t('assistant.questionFarmer'),
    },
    {
      role: 'assistant',
      text: t('assistant.answerFarmer'),
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const resetConversation = (language) => {
      const translate = i18n.getFixedT(language, 'translation');
      setActiveConversationId(1);
      setChatMessages([
        { role: 'user', text: translate('assistant.questionFarmer') },
        { role: 'assistant', text: translate('assistant.answerFarmer') },
      ]);
    };

    i18n.on('languageChanged', resetConversation);
    return () => i18n.off('languageChanged', resetConversation);
  }, [i18n]);

  const sendQuestion = async (question) => {
    setChatMessages((previous) => [...previous, { role: 'user', text: question }]);
    setIsTyping(true);
    try {
      const result = await askAssistant(question, i18n.resolvedLanguage);
      setChatMessages((previous) => [
        ...previous,
        {
          role: 'assistant',
          text: result.success
            ? result.answer
            : result.code === 'AI_NOT_CONFIGURED'
              ? t('assistant.notConfigured')
              : t('assistant.error'),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSelectPreset = (conversation) => {
    setActiveConversationId(conversation.id);
    sendQuestion(t(conversation.questionKey));
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    const userMessage = customInput.trim();
    setCustomInput('');
    await sendQuestion(userMessage);
  };

  return (
    <section id="ai-assistant" className="py-20 bg-white relative overflow-hidden">
      
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-teal-50/70 blur-3xl -z-10 rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-50/70 blur-3xl -z-10 rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Explanation Column (Col 5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold border border-teal-200">
              <Bot className="w-3.5 h-3.5 text-teal-600" />
              <span>{t('assistant.badge')}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {t('assistant.title')}
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              {t('assistant.description')}
            </p>

            {/* Feature highlights */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">{t('assistant.plain')}</h4>
                  <p className="text-xs text-slate-500">{t('assistant.plainDescription')}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">{t('assistant.languages')}</h4>
                  <p className="text-xs text-slate-500">{t('assistant.languagesDescription')}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">{t('assistant.documents')}</h4>
                  <p className="text-xs text-slate-500">{t('assistant.documentsDescription')}</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <button
                onClick={onOpenChatModal}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-slate-900 via-blue-900 to-teal-700 hover:from-slate-800 hover:to-teal-600 rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
              >
                <Sparkles className="w-4 h-4 text-teal-300" />
                <span>{t('assistant.start')}</span>
                <ArrowRight className="w-4 h-4 text-teal-300 ml-1" />
              </button>
            </div>
          </div>

          {/* Right Chatbot Preview Container (Col 7) */}
          <div className="lg:col-span-7">
            
            {/* Interactive Chatbot Mock Window */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl shadow-slate-200/80 overflow-hidden">
              
              {/* Window Header */}
              <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-slate-900 font-bold">
                      <Bot className="w-5 h-5" />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-900"></span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                      <span>{t('assistant.name')}</span>
                      <span className="text-[10px] bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded-full font-medium">{t('assistant.online')}</span>
                    </h4>
                    <p className="text-[11px] text-slate-300">{t('assistant.basedOn')}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-700"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-700"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-400"></span>
                </div>
              </div>

              {/* Sample Question Chips */}
              <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-100 flex items-center gap-2 overflow-x-auto scrollbar-none">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
                  {t('assistant.tryAsking')}
                </span>
                {conversations.map((convo) => (
                  <button
                    key={convo.id}
                    onClick={() => handleSelectPreset(convo)}
                    className={`text-xs px-3 py-1 rounded-full whitespace-nowrap transition-colors font-medium border ${
                      activeConversationId === convo.id
                        ? 'bg-teal-50 text-teal-800 border-teal-300 font-semibold'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {convo.tag}
                  </button>
                ))}
              </div>

              {/* Messages Body */}
              <div className="p-6 space-y-4 max-h-[360px] overflow-y-auto bg-gradient-to-b from-white to-slate-50/50">
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-3 ${
                      msg.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 text-xs">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-slate-900 text-white rounded-tr-none'
                          : 'bg-white border border-slate-200/90 text-slate-800 rounded-tl-none shadow-sm'
                      }`}
                    >
                      <div className="whitespace-pre-line">
                        {msg.text}
                      </div>
                      <div
                        className={`text-[10px] mt-1.5 text-right ${
                          msg.role === 'user' ? 'text-slate-400' : 'text-slate-400'
                        }`}
                      >
                        {msg.time}
                      </div>
                    </div>

                    {msg.role === 'user' && (
                      <div className="w-8 h-8 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 text-xs font-bold">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-center gap-2 text-xs text-slate-500 pl-11">
                    <span className="w-2 h-2 rounded-full bg-teal-500 animate-bounce"></span>
                    <span className="w-2 h-2 rounded-full bg-teal-500 animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-2 h-2 rounded-full bg-teal-500 animate-bounce [animation-delay:0.4s]"></span>
                    <span>{t('assistant.analyzing')}</span>
                  </div>
                )}
              </div>

              {/* Chat Input Bar */}
              <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-100 flex items-center gap-2">
                <input
                  type="text"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder={t('assistant.placeholder')}
                  className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                />
                <button
                  type="submit"
                  disabled={isTyping || !customInput.trim()}
                  className="p-2.5 rounded-xl bg-slate-900 hover:bg-teal-700 text-white transition-colors"
                  aria-label={t('assistant.send')}
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
