import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Input, Modal, Popover, Switch } from '@/shared/ui'
import s from './home.module.scss'

export const HomePage: FC = () => {
  const { t } = useTranslation(['common'])

  const [checked, setChecked] = useState(true)
  const [visible, setVisible] = useState(false)
  const [className, setClassName] = useState(1000)

  return (
    <div className={s.home}>
      <Button onClick={() => setVisible((v) => !v)}>Modal</Button>
      <Button disabled>{t('common:buttons.open', 'Открыть')}</Button>
      <Button disabled>{t('common:buttons.update', 'Обновить')}</Button>
      <Switch
        checked={checked}
        onChange={setChecked}
      />
      <Switch
        disabled
        checked={false}
      />
      <Switch
        disabled
        checked={true}
      />
      <Input value={t('common:buttons.default', 'Default')} />
      <Input placeholder='Placeholder' />
      <Input
        disabled
        value='Default'
      />

      <Popover content={<Button>Yes</Button>}>
        <Button>Popover</Button>
      </Popover>

      {checked && (
        <Modal
          visible={visible}
          onClose={() => setVisible(false)}
        >
          <Button onClick={() => setClassName(2000)}>Кнопка to v</Button>
          <Button onClick={() => setClassName(1000)}>Кнопка to a</Button>
          <Switch
            checked={checked}
            onChange={setChecked}
          />
        </Modal>
      )}
    </div>
  )
}

export default HomePage
