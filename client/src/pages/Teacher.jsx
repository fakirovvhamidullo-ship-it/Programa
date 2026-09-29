import { Bot } from 'lucide-react'
import { AiTeacher } from '../components/AiTeacher'
import { useI18n } from '../i18n/useI18n'

export default function TeacherPage() {
  const { t } = useI18n()
  return (
    <div>
      <h1>
        <Bot size={28} style={{ verticalAlign: 'middle' }} /> {t('teacherTitle')}
      </h1>
      <AiTeacher embedded />
    </div>
  )
}
