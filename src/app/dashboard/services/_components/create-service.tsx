import { Plus } from 'lucide-react'

import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

export function CreateService() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button className="flex-1 sm:flex-none">
					Adicionar <Plus />
				</Button>
			</SheetTrigger>
			<SheetContent aria-describedby={undefined}>
				<SheetHeader>
					<SheetTitle>Adicionar serviço</SheetTitle>
				</SheetHeader>
				<SheetFooter>
					<SheetClose asChild>
						<Button type="submit" className="w-full">
							Salvar
						</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}
