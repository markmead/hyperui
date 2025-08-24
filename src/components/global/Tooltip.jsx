import * as TooltipProvider from '@radix-ui/react-tooltip'

export default function Tooltip({
  children,
  tooltipContent,
  tooltipSide = 'top',
  ...tooltipProps
}) {
  return (
    <TooltipProvider.Provider delayDuration={200} skipDelayDuration={500} disableHoverableContent>
      <TooltipProvider.Root>
        <TooltipProvider.Trigger asChild>{children}</TooltipProvider.Trigger>

        <TooltipProvider.Portal>
          <TooltipProvider.Content
            side={tooltipSide}
            sideOffset={6}
            className="rounded-md bg-stone-900 px-3 py-2 text-sm/none font-medium text-white"
            {...tooltipProps}
          >
            {tooltipContent}

            <TooltipProvider.Arrow className="fill-stone-900" />
          </TooltipProvider.Content>
        </TooltipProvider.Portal>
      </TooltipProvider.Root>
    </TooltipProvider.Provider>
  )
}
