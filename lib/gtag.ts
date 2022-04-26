type GtagEventParams = {
  action: string;
  value?: number | undefined;
  label?: string | undefined;
  category?: string | undefined;
}

export const GA_TRACKING_ID = 'G-VE5EHLYPZP'

export const pageview = (url: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

export const event = ({ action, category, label, value }: GtagEventParams) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}
