import { useSidebar } from "@/hooks/use-sidebar"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "../ui/sidebar"
import { ArrowLeft, ChevronDown, Folder, Settings, Smile } from "lucide-react"
import type { IconType } from "@/lib/utils"
import { Link } from "react-router"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible"

export function AppSideBar() {

    const {toggleSidebar} = useSidebar()

    return (
        <Sidebar>
            <SidebarHeader>
                <div className="flex items-center gap-4">
                    <ArrowLeft className="cursor-pointer" onClick={toggleSidebar} size={24} />
                    <div className="flex flex-col">
                        <span className="text-xl fw-bold">Hello Side Bar</span>
                        <span className="text-sm text-gray-500">This is Side bar Demo</span>    
                    </div>
                </div>
            </SidebarHeader>

            <SidebarContent>
                {MENU.map((group, groupIndex) => 
                    <SidebarGroup key={`g-${groupIndex}`}>
                        <SidebarGroupLabel>{group.title}</SidebarGroupLabel>

                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map((item, itemIndex) => 
                                    <AppMenuGroupItem key={`item-${groupIndex}-${itemIndex}`} item={item} />
                                )}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                )}
            </SidebarContent>
        </Sidebar>
    )
}

function AppMenuGroupItem({item} : {item : MenuItem}) {
    if(item.type == "group") {
        return <AppGroupMenu menu={item as GroupMenu} />
    }

    return <AppSingleMenu menu={item as SingleMenu} />

}

function AppGroupMenu({menu} : {menu : GroupMenu}) {


    return (
        <SidebarMenuItem>
            <Collapsible className="group/collapsible">
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                        {menu.icon ? 
                            <menu.icon /> : 
                            <Folder />
                        }
                        <span>{menu.title}</span>
                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub>
                        {menu.items.map((sub, index) => 
                            <SidebarMenuSubItem key={`sub-${index}`}>
                                <SidebarMenuSubButton asChild>
                                    <Link to={sub.url}>
                                        {sub.title}
                                    </Link>
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                        )}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </Collapsible>
        </SidebarMenuItem>
    )
}

function AppSingleMenu({menu} : {menu : SingleMenu}) {
    return (
        <SidebarMenuItem>
            <SidebarMenuButton asChild>
                <Link to={menu.url}>
                    {menu.icon && <menu.icon />}
                    <span>{menu.title}</span>
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    )
}

type SingleMenu = {
    title : string
    icon? : IconType
    url: string
}

type GroupMenu = {
    title : string
    icon? : IconType
    items: SingleMenu []
}

type MenuItem = {
    type : 'single' | 'group'
} & (SingleMenu | GroupMenu)

type MenuGroup = {
    title : string
    items : MenuItem []
}

const MENU:MenuGroup[] = [
    {
        title : 'Mix Menus',
        items : [
            {type : 'single', title : 'Single Menu', icon : Smile, url: '' },
            {type : 'group', title: 'Sub Menu 1', items : [
                {title : 'Sub Menu Item 1-1', url: ''},
                {title : 'Sub Menu Item 1-2', url: ''},
                {title : 'Sub Menu Item 1-3', url: ''},
                {title : 'Sub Menu Item 1-4', url: ''},
            ]}
        ]
    }
]