import { toyService } from "../services/toy.service.js"
import { GoogleMap } from "../cmps/GoogleMap.jsx"
import { useState } from "react"

export function About() {
    const shopBranches = toyService.getShopBranches()
    const [branch, setBranch] = useState(toyService.getDefaultBranch())

    return <section className="about">
        <nav>
            <h2>Shop Branches</h2>
            <div className="about-branches">
                {shopBranches.map(branch =>
                    <button key={branch.name} onClick={() => setBranch({ ...branch })}>{branch.name}</button>
                )}
            </div>
        </nav>
        <GoogleMap shopBranches={shopBranches} chosenBranch={branch} />
    </section>
}

