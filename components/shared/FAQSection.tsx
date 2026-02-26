"use client"

import { useState } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { generateFAQSchema, renderSchemaScript } from "@/lib/structured-data"

const faqData = [
  {
    question: "What is a DeFi-enabled course?",
    answer:
      "A DeFi-enabled course integrates decentralized finance features, allowing students to earn yield on their tuition payments, participate in governance through DAOs, and receive educational funding through crypto tokens.",
  },
  {
    question: "How do NFT credentials work?",
    answer:
      "Upon course completion, graduates receive non-fungible tokens (NFTs) as verifiable educational credentials stored on the blockchain. These NFTs serve as portable, tamper-proof proof of your qualifications.",
  },
  {
    question: "Can I pay for courses with cryptocurrency?",
    answer:
      "Yes! Our platform accepts major cryptocurrencies including Bitcoin, Ethereum, USDC, and other stablecoins. You'll find 'Crypto Accepted' courses marked with a badge in our directory.",
  },
  {
    question: "What is 'Learn Now, Pay Later'?",
    answer:
      "This feature allows students to start their courses immediately while deferring tuition payments. Powered by DeFi protocols, it offers flexible repayment terms without traditional credit checks.",
  },
  {
    question: "How does Stake-to-Learn work?",
    answer:
      "Lock USDC or other tokens in a smart contract to earn yield while supporting educational initiatives. Your stake is returned upon graduation, and the earned rewards can be used toward tuition or kept as passive income.",
  },
  {
    question: "Are these courses accredited?",
    answer:
      "Yes, all courses in our platform are offered by registered training organizations (RTOs) and meet Australian government accreditation standards. FinTech features are supplementary to the core curriculum.",
  },
  {
    question: "How do I compare multiple courses?",
    answer:
      "Use the comparison tool to select 2-3 courses side-by-side. Compare market pricing, placement rates, salary outcomes, and available FinTech features to make an informed decision.",
  },
  {
    question: "What are the employment outcomes?",
    answer:
      "Each course displays verified placement rates and average salary data. This information is audited through smart contracts and updated quarterly based on graduate employment surveys.",
  },
]

export function FAQSection() {
  const schema = generateFAQSchema(faqData)

  return (
    <>
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: renderSchemaScript(schema),
        }}
      />

      <section className="bg-white py-16 border-t border-soft-grey">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about DeFi-enabled vocational courses and NFT credentials
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqData.map((item, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="border border-soft-grey rounded-lg px-6 data-[state=open]:bg-gray-50"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  )
}
