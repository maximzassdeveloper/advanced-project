import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Input, Modal, Popover, Select, Switch } from '@/shared/ui'
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
      <Select
        options={[
          { label: 'option 1', value: 'option1' },
          { label: 'option 2', value: 'option2' },
          { label: 'option 3', value: 'option3', disabled: true },
        ]}
      />
      <Switch
        disabled
        checked={true}
      />
      <Input
        value={t('common:buttons.default', 'Default')}
        readOnly
      />
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

      <div style={{ height: '140vh', display: 'block' }}>block for scroll</div>
    </div>
  )
}

export default HomePage
